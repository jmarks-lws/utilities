import { count } from './count';
import { FilterFn } from './types/FilterFn';
import { where } from './where';

/**
 * Asserts that all elements match a given condition
 * @param array - The source array
 * @param fn - Function used to filter the source list.
 */
export const hasAll = <T>(
  array: T[],
  fn: FilterFn<T>,
) => count(where(array, fn)) === count(array);
