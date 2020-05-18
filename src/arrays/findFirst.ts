import { first } from './first';
import { where } from './where';
import { FilterFn } from './types/FilterFn';

/**
 * Returns the first T that matches a provided condition from an Array<T>
 * @param array - The source array
 * @param whereFn - Function used to filter the source list.
 */
export const findFirst = <T>(
  array: Array<T>,
  whereFn: FilterFn<T>,
) => first(where(array, whereFn));
