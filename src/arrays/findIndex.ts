import { FilterFn } from './types/FilterFn';

/**
 * Returns the index of the first element in the array where predicate is true, and -1 otherwise.
 * @param array - Array to search.
 * @param filterFn — find calls predicate once for each element of the array, in ascending order, until it finds
 *    one where predicate returns true. If such an element is found, findIndex immediately returns that element index.
 *    Otherwise, findIndex returns -1.
 */
export const findIndex = <T>(
  array: T[],
  filterFn: FilterFn<T>,
) => array.findIndex(filterFn);
