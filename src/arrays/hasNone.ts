import { hasAny } from './hasAny';
import { FilterFn } from './types/FilterFn';

/**
 * Asserts that an array does not have any elements matching a condition
 * @param array - The source array
 * @param fn - Function used to filter the source list.
 */
export const hasNone = <T>(array: Array<T>, fn: FilterFn<T>) => !hasAny(array, fn);
