import { keys } from './keys';
import { intersect } from '../arrays/intersect';
import { Hash } from './types/Hash';

/**
 * Gets a list of keys that exist in both `a` and `b` and returns them as a new string array.
 * @param a
 * @param b
 */
export const getSharedKeys = <T, U>(a: T, b: U): Array<keyof Partial<T> | keyof Partial<U>> => (
  intersect<keyof T | keyof U>(
    keys(a as Hash) as Array<keyof T | keyof U>,
    keys(b as Hash) as Array<keyof T | keyof U>,
  ) as Array<string> as Array<keyof Partial<T> | keyof Partial<U>>
);
