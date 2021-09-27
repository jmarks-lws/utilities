import { Hash } from './types/Hash';
import { keys } from './keys';
import { reduce } from '../arrays/reduce';

/**
 * Similar to `forEach`, but allows short-circuiting by calling the provided `_break` callback function.
 * Loop over a JS object as if it were an array where the property names are associative keys.
 *
 * Note: This is "magic" and should probably be handled by the consumer, but remains for backwards compatibility.
 *
 * @param hash
 * @param fn
 */
export const iterateWithBreak = ( // TODO: Make so it works with arrays too (like `iterate()`)
  hash: Hash,
  /**
   * Call _break(); to short circuit the loop.
   */
  fn: ((key: string, value: any, _break: () => void) => void),
) => {
  reduce(keys(hash), (acc: Hash, key) => {
    let done: boolean = false || acc.done;
    if (!acc.done) {
      fn(key as string, hash[key], () => {
        done = true; // If the consumer calls _break(), set done to true, which should short circuit the loop.
      });
    }
    return { done };
  }, { done: false });
};
