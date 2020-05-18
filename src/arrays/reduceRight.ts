import { ReduceFn } from './types/ReduceFn';

/**
 * Similar to `reduce()` but array elements are processed from last to first. (See `reduce()`)
 */
export const reduceRight = <TElement, TResult>(
  array: TElement[],
  fn: ReduceFn<TElement, TResult>,
  init: TResult,
) => array.reduceRight(fn, init);
/** Alias for `reduceRight()` */
export const aggregateRight = reduceRight;
