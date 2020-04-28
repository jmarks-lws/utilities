import crypto from 'crypto';
import { Hash } from '..';

// Internals
const hashes = crypto.getHashes ? crypto.getHashes().slice() : ['sha1', 'md5'];
hashes.push('passthrough');
const encodings = ['buffer', 'hex', 'binary', 'base64'];

function applyDefaults(object: any, sourceOptions: any = {}) {
  // create a copy rather than mutating
  const options: any = {};
  options.algorithm = sourceOptions.algorithm || 'sha1';
  options.encoding = sourceOptions.encoding || 'hex';
  options.excludeValues = !!sourceOptions.excludeValues;
  options.algorithm = options.algorithm.toLowerCase();
  options.encoding = options.encoding.toLowerCase();
  options.ignoreUnknown = sourceOptions.ignoreUnknown === true; // default to false
  options.respectType = sourceOptions.respectType !== false; // default to true
  options.respectFunctionNames = sourceOptions.respectFunctionNames !== false;
  options.respectFunctionProperties = sourceOptions.respectFunctionProperties !== false;
  options.unorderedArrays = sourceOptions.unorderedArrays === true; // default to false
  options.unorderedSets = sourceOptions.unorderedSets !== false; // default to false
  options.unorderedObjects = sourceOptions.unorderedObjects !== false; // default to true
  options.replacer = sourceOptions.replacer || undefined;
  options.excludeKeys = sourceOptions.excludeKeys || undefined;

  if (typeof object === 'undefined') {
    throw new Error('Object argument required.');
  }

  // if there is a case-insensitive match in the hashes list, accept it
  // (i.e. SHA256 for sha256)
  for (let i = 0; i < hashes.length; ++i) {
    if (hashes[i].toLowerCase() === options.algorithm.toLowerCase()) {
      options.algorithm = hashes[i];
    }
  }

  if (hashes.indexOf(options.algorithm) === -1) {
    throw new Error(`Algorithm "${options.algorithm}"  not supported. `
      + `supported values: ${hashes.join(', ')}`);
  }

  if (
    encodings.indexOf(options.encoding) === -1
    && options.algorithm !== 'passthrough'
  ) {
    throw new Error(`Encoding "${options.encoding}"  not supported. `
      + `supported values: ${encodings.join(', ')}`);
  }

  return options;
}

// Mini-implementation of stream.PassThrough
// We are far from having need for the full implementation, and we can
// make assumptions like "many writes, then only one final read"
// and we can ignore encoding specifics
class PassThrough {
  buf: string = '';

  write(b: any) {
    this.buf += b;
  }

  end(b: any) {
    this.buf += b;
  }

  read() {
    return this.buf;
  }
}

/** Check if the given function is a native function */
function isNativeFunction(f: Function) {
  if ((typeof f) !== 'function') {
    return false;
  }
  const exp = /^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i;
  return exp.exec(Function.prototype.toString.call(f)) != null;
}

function typeHasher(options: any, writeTo: any, context: any = []) {
  const write = (str: string | Buffer, p2: string = 'utf8') => {
    if (writeTo.update) {
      return writeTo.update(str, p2);
    }
    return writeTo.write(str, p2);
  };

  return {
    /* eslint-disable no-param-reassign */
    dispatch(value: any): any {
      if (options.replacer) {
        value = options.replacer(value);
      }

      let type: string = typeof value;
      if (value === null) {
        type = 'null';
      }

      // console.log("[DEBUG] Dispatch: ", value, "->", type, " -> ", "_" + type);

      return this[`_${type}`](value);
    },
    /* eslint-enable no-param-reassign */
    _object(object: any) : any {
      const pattern = (/\[object (.*)\]/i);
      const objString = Object.prototype.toString.call(object);
      let objType: any = pattern.exec(objString);
      let _: any;
      if (!objType) { // object type did not match [object ...]
        objType = `unknown:[${objString}]`;
      } else {
        [ _, objType ] = objType; // take only the class name
      }

      objType = objType.toLowerCase();

      const objectNumber = context.indexOf(object);
      if (objectNumber >= 0) {
        return this.dispatch(`[CIRCULAR:${objectNumber}]`);
      }
      context.push(object);


      if (typeof Buffer !== 'undefined' && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write('buffer:');
        return write(object);
      }

      if (objType !== 'object' && objType !== 'function' && objType !== 'asyncfunction') {
        if (this[`_${objType}`]) {
          this[`_${objType}`](object);
        } else if (options.ignoreUnknown) {
          return write(`[${objType}]`);
        } else {
          throw new Error(`Unknown object type "${objType}"`);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        // Make sure to incorporate special properties, so
        // Types with different prototypes will produce
        // a different hash and objects derived from
        // different functions (`new Foo`, `new Bar`) will
        // produce different hashes.
        // We never do this for native functions since some
        // seem to break because of that.
        if (options.respectType !== false && !isNativeFunction(object)) {
          keys.splice(0, 0, 'prototype', '__proto__', 'constructor');
        }

        if (options.excludeKeys) {
          keys = keys.filter((key) => !options.excludeKeys(key));
        }

        write(`object:${keys.length}:`);
        const self = this;
        return keys.forEach((key) => {
          self.dispatch(key);
          write(':');
          if (!options.excludeValues) {
            self.dispatch(object[key]);
          }
          write(',');
        });
      }
      throw new Error('This shouldn\'t ever happen.');
    },
    _array(arr: any[], unordered: boolean) {
      const isUnordered = () => (
        typeof unordered !== 'undefined'
          ? unordered
          : options.unorderedArrays !== false
      ); // default to options.unorderedArrays

      const self = this;
      write(`array:${arr.length}:`);
      if (!isUnordered() || arr.length <= 1) {
        return arr.forEach((entry) => self.dispatch(entry));
      }

      // the unordered case is a little more complicated:
      // since there is no canonical ordering on objects,
      // i.e. {a:1} < {a:2} and {a:1} > {a:2} are both false,
      // we first serialize each entry using a PassThrough stream
      // before sorting.
      // also: we can’t use the same context array for all entries
      // since the order of hashing should *not* matter. instead,
      // we keep track of the additions to a copy of the context array
      // and add all of them to the global context array when we’re done
      let contextAdditions: any[] = [];
      const entries = arr.map((entry) => {
        const strm: any = new PassThrough();
        const localContext = context.slice(); // make copy
        const hasher = typeHasher(options, strm, localContext);
        hasher.dispatch(entry);
        // take only what was added to localContext and append it to contextAdditions
        contextAdditions = contextAdditions.concat(localContext.slice(context.length));
        return strm.read().toString();
      });
      // eslint-disable-next-line no-param-reassign
      context = context.concat(contextAdditions);
      entries.sort();
      return this._array(entries, false);
    },
    _date(date: Date) {
      return write(`date:${date.toJSON()}`);
    },
    _symbol(sym: Symbol) {
      return write(`symbol:${sym.toString()}`);
    },
    _error(err: Error) {
      return write(`error:${err.toString()}`);
    },
    _boolean(bool: boolean) {
      return write(`bool:${bool.toString()}`);
    },
    _string(string: string) {
      write(`string:${string.length}:`);
      write(string.toString());
    },
    _function(fn: Function) {
      write('fn:');
      if (isNativeFunction(fn)) {
        this.dispatch('[native]');
      } else {
        this.dispatch(fn.toString());
      }

      if (options.respectFunctionNames !== false) {
        // Make sure we can still distinguish native functions
        // by their name, otherwise String and Function will
        // have the same hash
        this.dispatch(`function-name:${String(fn.name)}`);
      }

      if (options.respectFunctionProperties) {
        this._object(fn);
      }
    },
    _number(number: number) {
      return write(`number:${number.toString()}`);
    },
    _xml(xml: string) {
      return write(`xml:${xml.toString()}`);
    },
    _null() {
      return write('Null');
    },
    _undefined() {
      return write('Undefined');
    },
    _regexp(regex: RegExp) {
      return write(`regex:${regex.toString()}`);
    },
    _uint8array(arr: Uint8Array) {
      write('uint8array:');
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    _uint8clampedarray(arr: Uint8ClampedArray) {
      write('uint8clampedarray:');
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    _int8array(arr: Int8Array) {
      write('uint8array:');
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    _uint16array(arr: Uint16Array) {
      write('uint16array:');
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    _int16array(arr: Int16Array) {
      write('uint16array:');
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    _uint32array(arr: Uint32Array) {
      write('uint32array:');
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    _int32array(arr: Int32Array) {
      write('uint32array:');
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    _float32array(arr: Float32Array) {
      write('float32array:');
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    _float64array(arr: Float64Array) {
      write('float64array:');
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    _arraybuffer(arr: ArrayBuffer) {
      write('arraybuffer:');
      return this.dispatch(new Uint8Array(arr));
    },
    _url(url: string) {
      return write(`url:${url.toString()}`, 'utf8');
    },
    _map(map: Map<any, any>) {
      write('map:');
      const arr = Array.from(map);
      return this._array(arr, options.unorderedSets !== false);
    },
    _set(set: Set<any>) {
      write('set:');
      const arr = Array.from(set);
      return this._array(arr, options.unorderedSets !== false);
    },
    _blob() {
      if (options.ignoreUnknown) {
        return write('[blob]');
      }

      throw Error('Hashing Blob objects is currently not supported\n'
        + '(see https://github.com/puleos/object-hash/issues/26)\n'
        + 'Use "options.replacer" or "options.ignoreUnknown"\n');
    },
    _domwindow() { return write('domwindow'); },
    /* Node.js standard native objects */
    _process() { return write('process'); },
    _timer() { return write('timer'); },
    _pipe() { return write('pipe'); },
    _tcp() { return write('tcp'); },
    _udp() { return write('udp'); },
    _tty() { return write('tty'); },
    _statwatcher() { return write('statwatcher'); },
    _securecontext() { return write('securecontext'); },
    _connection() { return write('connection'); },
    _zlib() { return write('zlib'); },
    _context() { return write('context'); },
    _nodescript() { return write('nodescript'); },
    _httpparser() { return write('httpparser'); },
    _dataview() { return write('dataview'); },
    _signal() { return write('signal'); },
    _fsevent() { return write('fsevent'); },
    _tlswrap() { return write('tlswrap'); },
  } as Hash;
}

function hash(object: any, options: any) {
  let hashingStream: any;

  if (options.algorithm !== 'passthrough') {
    hashingStream = crypto.createHash(options.algorithm);
  } else {
    hashingStream = new PassThrough();
  }

  if (typeof hashingStream.write === 'undefined') {
    hashingStream.write = hashingStream.update;
    hashingStream.end = hashingStream.update;
  }

  const hasher = typeHasher(options, hashingStream);
  hasher.dispatch(object);
  if (!hashingStream.update) {
    hashingStream.end('');
  }

  if (hashingStream.digest) {
    return hashingStream.digest(options.encoding === 'buffer' ? undefined : options.encoding);
  }

  const buf = hashingStream.read();
  if (options.encoding === 'buffer') {
    return buf;
  }

  return buf.toString(options.encoding);
}

/**
 * Expose streaming API
 *
 * @param {object} object  Value to serialize
 * @param {object} options  Options, as for hash()
 * @param {object} stream  A stream to write the serializiation to
 * @api public
 */
exports.writeToStream = (object: any, options: any, stream: any) => {
  /* eslint-disable no-param-reassign */
  if (typeof stream === 'undefined') {
    stream = options;
    options = {};
  }

  options = applyDefaults(object, options);

  return typeHasher(options, stream).dispatch(object);
  /* eslint-enable no-param-reassign */
};

/**
 * Exported function
 *
 * Options:
 *
 *  - `algorithm` hash algo to be used by this instance: *'sha1', 'md5'
 *  - `excludeValues` {true|*false} hash object keys, values ignored
 *  - `encoding` hash encoding, supports 'buffer', '*hex', 'binary', 'base64'
 *  - `ignoreUnknown` {true|*false} ignore unknown object types
 *  - `replacer` optional function that replaces values before hashing
 *  - `respectFunctionProperties` {*true|false} consider function properties when hashing
 *  - `respectFunctionNames` {*true|false} consider 'name' property of functions for hashing
 *  - `respectType` {*true|false} Respect special properties (prototype, constructor)
 *    when hashing to distinguish between types
 *  - `unorderedArrays` {true|*false} Sort all arrays before hashing
 *  - `unorderedSets` {*true|false} Sort `Set` and `Map` instances before hashing
 *  * = default
 *
 * @param {object} object value to hash
 * @param {object} options hashing options
 * @return {string} hash value
 * @api public
 */
export default function objectHash(object : any, options?: any) {
  return hash(object, applyDefaults(object, options));
}

/* eslint-disable max-len */
/**
 * Exported sugar methods
 *
 * @param {object} object value to hash
 * @return {string} hash value
 * @api public
 */
objectHash.sha1 = (object: any): string => objectHash(object);
objectHash.keys = (object: any): string => objectHash(object, { excludeValues: true, algorithm: 'sha1', encoding: 'hex' });
objectHash.MD5 = (object: any): string => objectHash(object, { algorithm: 'md5', encoding: 'hex' });
objectHash.keysMD5 = (object: any): string => objectHash(object, { algorithm: 'md5', encoding: 'hex', excludeValues: true });
/* eslint-enable max-len */
