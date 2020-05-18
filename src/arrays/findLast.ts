import { where } from './where';
import { last } from './last';
import { FilterFn } from './types/FilterFn';

/**
 * Returns the last T that matches a provided condition from an Array<T>
 * @param array - The source array
 * @param whereFn - Function used to filter the source list.
 */
export const findLast = <T>(
  array: Array<T>,
  whereFn: FilterFn<T>,
) => last(where(array, whereFn));
