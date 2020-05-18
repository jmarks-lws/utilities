import { FilterFn } from './types/FilterFn';
import { where } from './where';

/**
 * Asserts that an array has any elements matching a condition
 * @param array - The source array
 * @param fn - Function used to filter the source list.
 */
export const hasAny = <T>(array: Array<T>, fn: FilterFn<T>) => where(array, fn).length > 0;
