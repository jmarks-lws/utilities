import { mapKeys } from './mapKeys';
import { isDefinedObject } from './isDefinedObject';
import { map } from '../arrays/map';
import { isArray } from '../arrays/isArray';
import { HashOf } from './types/HashOf';

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
  if (isArray(hash)) {
    return map(hash, (value, i) => fn(`${i}`, value));
  }
  return isDefinedObject(hash) ? mapKeys(hash, (key) => fn(key, (hash)[key] as T)) : [];
};
