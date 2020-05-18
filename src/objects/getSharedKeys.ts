import { keys } from './keys';
import { intersect } from '../arrays/intersect';

/**
 * Gets a list of keys that exist in both `a` and `b` and returns them as a new string array.
 * @param a
 * @param b
 */
export const getSharedKeys = <T>(a: T, b: T): Array<keyof Partial<T>> => (
  intersect(keys(a), keys(b)) as Array<string> as Array<keyof Partial<T>>
);
