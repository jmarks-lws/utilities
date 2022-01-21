import { deepCloneArray } from './deepCloneArray';

/**
 * Returns a copy of the provided array that cannot be changed and does not allow mutator methods.
 * @param array The array to make immutable.
 */
export const immutableArray = <
  T extends Array<any>,
  TElement = T extends Array<infer X> ? X : never
>(mutableArray: Array<TElement>): readonly TElement[] => Object.freeze(deepCloneArray(mutableArray));
