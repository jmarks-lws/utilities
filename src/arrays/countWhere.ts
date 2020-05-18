import { FilterFn } from './types/FilterFn';
import { where } from './where';

/**
 * Returns number of elements in `array` matching a given condition.
 * @param array - The source array
 * @param fn - Function used to filter the source list.
 */
export const countWhere = <T>(
  array: Array<T>,
  fn: FilterFn<T>,
) => where(array, fn).length;
