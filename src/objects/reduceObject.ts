import { strVal } from '../misc/strVal';
import { keys } from './keys';
import { Hash } from './types/Hash';
import { HashOf } from './types/HashOf';

/**
 * Works just like `reduce` would for an array, only iterating over the entries of an object.
 *
 * @param obj - The object to iterate over. Each entry will be processed, one at a time by the reducer function.
 * @param callbackfn - a function that will transform the accumulated value on every step.
 * @param initialValue - starting value before iteration begins.
 */
export const reduceObject = <TInput, TReturn>(
  obj: HashOf<TInput>,
  callbackfn: (
    previousValue: TReturn,
    currentKey: string,
    currentValue: any,
    currentIndex: number,
    object: Hash,
  ) => TReturn,
  initialValue: TReturn,
): TReturn => (
    keys(obj).reduce((prev, curr, index) => callbackfn(prev, strVal(curr), obj[curr], index, obj), initialValue)
  );
