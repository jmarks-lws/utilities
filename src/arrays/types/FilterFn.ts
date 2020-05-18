/**
 * Function signature used in `filter()` and other filtering functions.
 */
export interface FilterFn<T> {
  (element: T, index: number, arrayRef: T[]): boolean;
}
