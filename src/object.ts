import {
  intersect, map, prune, reduce, head, tail,
  reverse,
  arrayEmpty,
} from './array';

export interface Hash { [index:string]: any }
export interface HashOf<T> { [index:string]: T }

export const { keys, values } = Object;

export const isObject = (x: any) => (!Array.isArray(x)) && (typeof x === 'object');

/**
 * Returns a new object that is the result of projecting only the properties specified by `fields`
 * @param obj - The object to project
 * @param fields - The fields to project from that object
 */
export const pick = (obj: Hash, fields: string[]) : Hash => intersect(
  keys(obj),
  fields,
).reduce(
  (prev: Hash, f: any) => ({ ...prev, [f]: obj[f] }),
  {} as Hash,
);

/**
 * Returns a new object that is the result of projecting only the properties of an object not listed in `fields`.
 *
 * @param fields - A string array containing the names of fields to remove
 * @param o - The source object from which to construct a result with its fields removed.
 */
export const pickNot = (obj: Hash, fields: string[]) : Hash => pick(obj, prune(keys(obj), fields));

/**
 * Fun trick to remove a field from an object by name.
 */
export const removeField = (field: string, { [field]: _, ...rest }) => rest;

/**
 * Returns a boolean indicating whether a given key exists in the provided object.
 * @param o
 * @param k
 */
export const hasKey = (o: Hash, k: string) : boolean => keys(o).includes(k);

/**
 * Performs a map operation on all keys of the provided object
 * @param o
 * @param fn
 */
export const mapKeys = (o: Hash, fn: ((k: string, i: number) => any)) => map(keys(o), fn);

/**
 * Returns a new object with a subset of properties where properties which have null or undefined values have been removed.
 * @param o
 */
export const compactObject = (o: any) => pick(o, keys(o).filter((key) => ![undefined, null].includes(o[key])));

/**
 * Returns a new object that is the result of merging together a series of objects. Values to the right
 * overwrite values before them.
 * @param {Hash[]} a - As many hashes as you like to merge together from left to right.
 */
export const merge = (...a: Hash[]) : Hash => ({ ...head(a), ...(!arrayEmpty(tail(a)) ? merge(...tail(a)) : null) })

/**
 * Returns a new object that is the result of merging together a series of objects going from the last to
 * the first objects. Values to the left overwrite values to their right.
 * @param {Hash[]} a - As many hashes as you like to merge together from left to right.
 */
export const mergeRight = (...a: Hash[]) : Hash => merge(...reverse(a));

/**
 * Gets a list of keys that exist in both provided objects and returns them as a new string array.
 * @param a
 * @param b
 */
export const getSharedKeys = (a: Hash, b: Hash) : Array<string> => intersect(keys(a), keys(b));

/**
 * Returns a new object that is the result of merging together two objects ONLY on keys that both share.
 * If `a` and `b` have differing values for a property, the resulting object will receive its value from object `b`.
 * This is a shallow and fast merge. More complex needs may need to be managed differently.
 * @param a
 * @param b
 */
export const mergeIntersection = (a: Hash, b: Hash) : Hash => {
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
export const pluck = (obj: Hash, field: string) : Hash => (hasKey(obj, field) ? pick(obj, [ field ])[field] : null);

/**
 * Returns a new object derived from `obj` where the keys are changed as described by `remap`, optionally including or omitting remaining data.
 *
 * @param obj Source object to remap keys
 * @param remap A map of key value pairs where the keys match keys from the source object and the values are the new object key names
 * @param returnAll Default `false`. If this is true, all data from the source object will be returned with only the key names in
 *                  `remap` being changed. All other keys and values will remain as they were in the source object.
 */
export const remapKeys = (obj: Hash, remap: Hash, returnAll: boolean = false) : Hash => reduce(
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
): Hash => reduce(keys(obj), (acc: Hash, key: string) => ({ ...acc, [acc[key]]: key }), {} as Hash);

/**
 * Loop over a JS object as if it were an array where the property names are associative keys.
 * @param hash
 * @param fn
 */
export const forEach = (
  hash: Hash | any[],
  fn: ((key: string, value: any) => void),
) => {
  if (Array.isArray(hash)) {
    let i = 0;
    return map(hash, (value) => fn(`${i++}`, value));
  }
  return mapKeys(hash || {}, (key) => fn(key, hash[key]));
};

/**
 * Similar to `forEach`, but allows short-circuiting by calling the provided `_break` callback function.
 * Loop over a JS object as if it were an array where the property names are associative keys.
 *
 * @param hash
 * @param fn
 */
export const forEachWithBreak = (
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
