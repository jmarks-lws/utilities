import { deepClone } from './deepClone';

/**
 * Returns a copy of the provided object that cannot be changed and does not allow mutator methods.
 * @param object The object to make immutable.
 */
export const immutable = <
  TKey extends string | number | symbol = string | number | symbol,
  TElement extends any = any,
>(mutable: Record<TKey, TElement>) => Object.freeze(deepClone(mutable));
