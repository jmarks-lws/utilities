import { FilterFn } from './types/FilterFn';

/**
 * Returns a new array of objects containing elements filtered from an original array of objects
 * where the filter function returns `true`.
 *
 * @param array - The source array
 * @param filterFn - Function used to filter the source list.
 */
export const where = <T>(
  array: Array<T>,
  filterFn: FilterFn<T>,
) => array.filter(filterFn);

/**
 * Alias for `where()`
 */
export const filter = where;
