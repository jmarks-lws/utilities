import { merge } from './merge';
import { HashOf } from './types/HashOf';

/**
 * Creates an object having keys from `keysArray` matching values from `valuesArray`. Assumes both arrays are the length of `keysArray`.
 * @param keysArray
 * @param valuesArray
 */
export const arraysToObject = <T>(
  keysArray: string[],
  valuesArray: T[],
): HashOf<T> => keysArray.reduce(
    (acc: HashOf<T>, key: string, index: number) => merge(acc, { [key]: valuesArray[index] }), {} as HashOf<T>,
  );
