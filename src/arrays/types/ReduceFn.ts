/**
 * Function signature used in `reduce()` and `reduceRight()`
 */
export interface ReduceFn<TElement, TResult> {
  (previousValue: TResult, currentValue: TElement, currentIndex: number, array: TElement[]): TResult;
}
