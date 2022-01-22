import { where } from './where';
import { FilterFn } from './types/FilterFn';

/**
 * Returns a new array of objects containing elements filtered from an original array of objects
 * where the filter function returns `false`.
 *
 * @param array - The source array
 * @param filterFn - Function used to filter the source list.
 */
export const whereNot = <T>(
  array: Array<T>,
  whereFn: FilterFn<T>,
) => where(array, (x, i, m) => !whereFn(x, i, m));

/**
 * Alias for `whereNot()`
 */
export const reject = whereNot;
