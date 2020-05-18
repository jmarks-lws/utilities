import { merge } from './merge';
import { Hash } from './types/Hash';

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
);
