import { FilterFn } from './types/FilterFn';

/**
 * Returns a new array of objects containing filtered from an original array of objects.
 * @param array - The source array
 * @param filterFn - Function used to filter the source list.
 */
export const filter = <T>(
  array: Array<T>,
  filterFn: FilterFn<T>,
) => array.filter(filterFn);

/**
 * Alias for `filter()`
 */
export const where = filter;
