import {
  intersect, map, prune, reduce, head, tail,
  reverse, arrayEmpty, filter,
} from './array';
import { isNull, Nullable } from './miscellaneous';

/** Type representing a tabular flat object. Most reference types in javascript can be a Hash. */
export interface Hash { [index: string]: any }
/** Type representing a tabular flat object, where the values are all of a given type `T`. */
export interface HashOf<T> { [index: string]: T }
// export interface KeyValuePair<T, U> {
//   key: T,
//   value: U,
// }
// export type Dictionary<T, U> = Array<KeyValuePair<T, U>>;

export const { keys, values, freeze } = Object;

/** Returns a boolean indicating whether `x` is a non null object. Does not return true for an array or a null value. */
export const isDefinedObject = (x: any) => (!Array.isArray(x)) && (typeof x === 'object') && !isNull(x);

/**
 * Returns a new object that is the result of projecting only the properties specified by `fields`
 * @param obj - The object to project
 * @param fields - The fields to project from that object
 */
export const pick = <T extends Hash>(obj: T, fields: string[]): Partial<T> => (
  reduce(
    intersect(keys(obj), fields),
    (prev: Hash, f: any) => ({ ...prev, [f]: obj[f] }),
    {} as Partial<T>,
  )
);

/**
 * Returns a new object that is the result of projecting only the properties of `o` not listed in `fields`.
 *
 * @param fields - A string array containing the names of fields to remove
 * @param o - The source object from which to construct a result with its fields removed.
 */
export const pickNot = (obj: Hash, fields: string[]): Hash => pick(obj, prune(keys(obj), fields));

/**
 * Returns an object that is the result of removing a field from `o` by name.
 */
export const removeField = (o: Hash, field: string) => ((fld: string, { [fld]: _, ...rest }) => rest)(field, o);

/**
 * Returns a boolean indicating whether a given key exists in the provided object.
 * @param o
 * @param k
 */
export const hasKey = (o: Hash, k: string): boolean => keys(o).includes(k);

/**
 * Performs a map operation on all keys of the provided object
 * @param o
 * @param fn
 */
export const mapKeys = <T, U>(o: HashOf<T>, fn: ((k: string, i: number) => U)): U[] => map(keys(o), fn);

/**
 * Returns a new object with a subset of properties where properties which have null or undefined values have been removed.
 * @param o
 */
export const compactObject = <T extends Hash>(o: T, keepNulls = false): Partial<T> => pick(
  o, filter(
    keys(o),
    (key) => o[key] !== undefined && (keepNulls || o[key] !== null),
  ),
);

/**
 * Returns a new object that is the result of merging together a series of objects. Values to the right
 * overwrite values before them.
 * @param {Hash[]} a - As many hashes as you like to merge together from left to right.
 */
export const merge = (...a: Hash[]): Hash => ({ ...head(a), ...(!arrayEmpty(tail(a)) ? merge(...tail(a)) : null) })

/**
 * Returns a new object that is the result of merging together a series of objects going from the last to
 * the first objects. Values to the left overwrite values to their right.
 * @param {Hash[]} a - As many hashes as you like to merge together from left to right.
 */
export const mergeRight = (...a: Hash[]): Hash => merge(...reverse(a));

/**
 * Gets a list of keys that exist in both provided objects and returns them as a new string array.
 * @param a
 * @param b
 */
export const getSharedKeys = (a: Hash, b: Hash): Array<string> => intersect(keys(a), keys(b));

/**
 * Returns a new object that is the result of merging together two objects ONLY on keys that both share.
 * If `a` and `b` have differing values for a property, the resulting object will receive its value from object `b`.
 * This is a shallow and fast merge. More complex needs may need to be managed differently.
 * @param a
 * @param b
 */
export const mergeIntersection = (a: Hash, b: Hash): Hash => {
  const [a2, b2] = [a, b].map((o: Hash) => pick(o, getSharedKeys(a, b)))
  return merge(a2, b2);
};

/**
 * Provides a list of change types where the "from" object is `a` and the "to" object is `b`.
 * '-' indicates a field was removed, '+' indicates a field was added, and '~' indicates that the value of a field has changed.
 * @param a
 * @param b
 */
export const diff = (a: Hash, b: Hash) => {
  const dif: Hash = {};
  const aKeys = keys(a);
  const bKeys = keys(b);
  aKeys.forEach((key: string) => {
    if (!bKeys.includes(key)) {
      dif[key] = '-';
    } else if (typeof a[key] === 'object') {
      const comparison = diff(a[key], b[key]);
      if (keys(comparison).length > 0) {
        dif[key] = diff(a[key], b[key]);
      }
    } else if (typeof a[key] !== typeof b[key] || a[key] !== b[key]) {
      dif[key] = '~'
    }
  });
  bKeys.forEach((key) => {
    if (!aKeys.includes(key)) {
      dif[key] = '+';
    }
  })
  return dif;
}

/**
 * Provides a list of change descriptions where the "from" object is `a` and the "to" object is `b`.
 * '-' indicates a field was removed, '+' indicates a field was added
 * @param a
 * @param b
 */
export const fullDiff = (a: Hash, b: Hash) => {
  const dif: Hash = {};
  const aKeys = keys(a);
  const bKeys = keys(b);
  aKeys.forEach((key: string) => {
    if (!bKeys.includes(key)) {
      dif[key] = { '-': a[key] };
    } else if (typeof a[key] === 'object') {
      const comparison = diff(a[key], b[key]);
      if (keys(comparison).length > 0) {
        dif[key] = comparison;
      }
    } else if (typeof a[key] !== typeof b[key] || a[key] !== b[key]) {
      dif[key] = { '-': a[key], '+': b[key] };
    }
  });
  bKeys.forEach((key) => {
    if (!aKeys.includes(key)) {
      dif[key] = { '+': b[key] };
    }
  })
  return dif;
}

/**
 * Returns a boolean indicating whether the two provided objects have different data.
 * @param a
 * @param b
 */
export const hasDiff = (a: Hash, b: Hash) => keys(diff(a, b)).length > 0;

/**
 * Returns a boolean indicating whether the two provided objects do NOT have different data.
 * @param a
 * @param b
 */
export const noDiff = (a: Hash, b: Hash) => !hasDiff(a, b);

/**
 * Safely get a value from an object
 * @param obj
 * @param field
 */
export const pluck = <T extends any>(
  obj: Hash,
  field: string,
): Nullable<T> => (hasKey(obj, field) ? obj[field] : null);

/**
 * Returns a new object derived from `obj` where the keys are changed as described by `remap`, optionally including or omitting remaining data.
 *
 * @param obj Source object to remap keys
 * @param remap A map of key value pairs where the keys match keys from the source object and the values are the new object key names
 * @param returnAll Default `false`. If this is true, all data from the source object will be returned with only the key names in
 *                  `remap` being changed. All other keys and values will remain as they were in the source object.
 */
export const remapKeys = (obj: Hash, remap: Hash, returnAll: boolean = false): Hash => reduce(
  keys(obj),
  (acc: Hash, k: string) => merge(
    { ...acc },
    ((hasKey(remap, k) || returnAll) ? { [(hasKey(remap, k) ? remap[k] : k)]: obj[k] } : {}),
  ), {} as Hash,
)

/**
 * Returns a new object where the keys and corresponding values of `obj` have been swapped with each other.
 * @param obj Object to invert
 */
export const invert = (
  obj: Hash,
): Hash => reduce(keys(obj), (acc: Hash, key: string) => ({ ...acc, [obj[key]]: key }), {} as Hash);

/**
 * Loop over an Array or over a JS object as if it were an associative array. Inspired by the PHP implementation
 * of `foreach`, returning an array result similar to what you might get from `Array.prototype.map()`
 * @param hash
 * @param fn
 *
 * @returns {Array<U>}
 */
export const iterate = <T, U>(
  hash: HashOf<T> | T[],
  fn: ((key: string, value: T) => U),
): U[] => {
  if (Array.isArray(hash)) {
    let i = 0;
    return map(hash, (value) => fn(`${i++}`, value));
  }
  return isDefinedObject(hash) ? mapKeys(hash, (key) => fn(key, hash[key])) : [];
};

/**
 * Similar to `forEach`, but allows short-circuiting by calling the provided `_break` callback function.
 * Loop over a JS object as if it were an array where the property names are associative keys.
 *
 * @param hash
 * @param fn
 */
export const iterateWithBreak = ( // TODO: Make so it works with arrays too (like `iterate()` above)
  hash: Hash,
  fn: ((key: string, value: any, _break: () => void) => void),
) => {
  reduce(keys(hash), (acc: Hash, key) => {
    let done: boolean = false || acc.done;
    if (!acc.done) {
      fn(key, hash[key], () => {
        done = true;
      });
    }
    return { done };
  }, { done: false });
};

/**
 * Gets a value from an object property with an optional default value.
 * @param o
 * @param key
 * @param defaultValue
 */
export const prop = (o: Hash, key: string, defaultValue: any = null): any => (hasKey(o, key) ? o[key] : defaultValue)

/**
 * Zips two arrays into an array of tuples. Assumes both arrays are the length of `keysArray`
 * @param keysArray
 * @param valuesArray
 */
export const zip = <T>(
  keysArray: string[],
  valuesArray: T[],
): Array<[string, T]> => keysArray.reduce(
    (acc: [string, T][], key: string, i) => acc.concat([key, valuesArray[i]]), [] as [string, T][],
  )

/**
 * Creates an object having keys from `keysArray` matching values from `valuesArray`. Assumes both arrays are the length of `keysArray`.
 * @param keysArray
 * @param valuesArray
 */
export const arraysToObject = (
  keysArray: string[],
  valuesArray: any[],
): Hash => keysArray.reduce(
  (acc: Hash, key: string, index: number) => merge(acc, { [key]: valuesArray[index] }), {} as Hash,
)

/**
 * Works similarly to mapping an array, but maps the values of `o`, returning a new object that has
 * the same keys with values each transformed by `fn`.
 */
export const transformValues = <T, U>(o: HashOf<T>, fn: (value: T) => U) : HashOf<U> => reduce(
  keys(o),
  (acc: HashOf<U>, key) => ({ ...acc, [key]: fn(o[key]) }),
  {} as HashOf<U>,
)

/**
 * Returns an object that is the result adding a property to `o`.
 * @param o
 * @param key
 * @param val
 */
export const addProp = <T>(o: HashOf<T>, key: string, val: T) => merge(o, { [key]: val });
