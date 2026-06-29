/* istanbul ignore file */
// Note: Ignoring because this was copied from an external github source.
import { Hash } from '..';

// Internals
//
// This is a vendored, dependency-free fork of `object-hash`. The original
// relied on node's `crypto` module to digest the serialized representation of
// a value. That dependency was deliberately removed (for browser/bundler
// friendliness and to keep this library at zero runtime dependencies), so the
// supported algorithms are no longer the crypto ones. Instead we expose:
//   - 'fnv1a'       : serialize the value, then run a tiny, dependency-free
//                     non-cryptographic digest over it so the result is a
//                     compact, fixed-length, collision-resistant key.
//   - 'passthrough' : return the raw serialized string with no digest applied.
// `fnv1a` is the default and is what the sole internal consumer (`memoize`)
// uses to derive stable cache keys. It is NOT a cryptographic hash.
const hashes = ['fnv1a', 'passthrough'];

function applyDefaults(object: any, sourceOptions: any = {}) {
  // create a copy rather than mutating
  const options: any = {};
  options.algorithm = sourceOptions.algorithm || 'fnv1a';
  options.excludeValues = !!sourceOptions.excludeValues;
  options.algorithm = options.algorithm.toLowerCase();
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

  if (hashes.indexOf(options.algorithm) === -1) {
    throw new Error(`Algorithm "${options.algorithm}"  not supported. `
      + `supported values: ${hashes.join(', ')}`);
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

/**
 * A tiny, dependency-free, non-cryptographic 64-bit string digest (the
 * well-known "cyrb53" hash, public domain, by bryc). It uses only 32-bit
 * integer math (`Math.imul`) so it runs identically in node and the browser
 * without pulling in node's `crypto` module. The 64 bits of state are rendered
 * as a fixed-length 16-character hex string.
 *
 * This is a member of the FNV-family of multiplicative hashes and is used
 * purely to turn the (potentially unbounded) serialized representation of a
 * value into a compact, stable, collision-resistant cache key. It provides NO
 * cryptographic guarantees and must not be relied on for security.
 */
/* eslint-disable no-bitwise */
function fnv1a(str: string): string {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; ++i) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  // Render both 32-bit lanes as zero-padded hex (avoids String.padStart, which
  // is not in the ES2015 lib this project targets) for a fixed 16-char digest.
  const toHex = (n: number) => `0000000${(n >>> 0).toString(16)}`.slice(-8);
  return toHex(h2) + toHex(h1);
}
/* eslint-enable no-bitwise */

function hash(object: any, options: any) {
  const hashingStream = new PassThrough();

  const hasher = typeHasher(options, hashingStream);
  hasher.dispatch(object);
  hashingStream.end('');

  const serialized = hashingStream.read();

  // 'passthrough' returns the raw serialized form; every other (digest)
  // algorithm condenses it to a compact, fixed-length key.
  if (options.algorithm === 'passthrough') {
    return serialized;
  }

  return fnv1a(serialized);
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
 *  - `algorithm` digest to be used by this instance: *'fnv1a', 'passthrough'
 *  - `excludeValues` {true|*false} hash object keys, values ignored
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

/**
 * Exported sugar methods
 *
 * @param {object} object value to hash
 * @return {string} hash value
 * @api public
 */
objectHash.keys = (object: any): string => objectHash(object, { excludeValues: true, algorithm: 'fnv1a' });
