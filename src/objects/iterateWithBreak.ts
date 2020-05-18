import { Hash } from './types/Hash';
import { keys } from './keys';
import { reduce } from '../arrays/reduce';

/**
 * Similar to `forEach`, but allows short-circuiting by calling the provided `_break` callback function.
 * Loop over a JS object as if it were an array where the property names are associative keys.
 *
 * @param hash
 * @param fn
 */
export const iterateWithBreak = ( // TODO: Make so it works with arrays too (like `iterate()` above)
  hash: Hash,
  fn: ((key: string, value: any, _break: () => void) => void),
) => {
  reduce(keys(hash), (acc: Hash, key) => {
    let done: boolean = false || acc.done;
    if (!acc.done) {
      fn(key, hash[key], () => {
        done = true;
      });
    }
    return { done };
  }, { done: false });
};
