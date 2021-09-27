import { keys } from './keys';
import { intersect } from '../arrays/intersect';

/**
 * Gets a list of keys that exist in both `a` and `b` and returns them as a new string array.
 * @param a
 * @param b
 */
export const getSharedKeys = <T, U>(a: T, b: U): Array<keyof Partial<T> | keyof Partial<U>> => (
  intersect<keyof T | keyof U>(keys(a), keys(b)) as Array<string> as Array<keyof Partial<T> | keyof Partial<U>>
);
