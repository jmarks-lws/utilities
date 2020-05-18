import { FilterFn } from './types/FilterFn';
import { where } from './where';
import { whereNot } from './whereNot';

/**
 * Returns a two element array. The first element is an array of items that match the provided query function, the second
 * is the items from the original array that do not match the function query.
 * @param array - The source array to query against.
 * @param filterFn - A lambda that describes elements to match.
 */
export const partition = <T>(
  array: T[],
  filterFn: FilterFn<T>,
) => [where(array, filterFn), whereNot(array, filterFn)];
