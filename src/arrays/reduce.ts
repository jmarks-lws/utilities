import { ReduceFn } from './types/ReduceFn';

/**
 * Step over each element in `array`, building a new output object which is initialized as `init`.
 * `fn` should return a new representation of the aggregate object after applying changes based
 * on an array element.
 *
 * @param array - An array to step over for source information
 * @param fn - A function to process each element in the array. It should return a new object that is the result of adding changes based on an array element.
 * @param init - The initial value for the object being built by `fn`. Represents the initial state of the object.
 */
export const reduce = <TElement, TResult>(
  array: TElement[],
  fn: ReduceFn<TElement, TResult>,
  init: TResult,
): TResult => array.reduce(fn, init);
/** Alias for `reduce()` */
export const aggregate = reduce;
