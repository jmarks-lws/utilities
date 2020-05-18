import { ComparerFn } from './types/ComparerFn';
import { arrayCopy } from './arrayCopy';

/**
 * Returns a NEW array that has been sorted using `sortFn`. The original array is unaffected.
 * @param array - The array to sort
 * @param sortFn - A function used to sort. This function should return a negative value if
 *                 a < b, zero for the same and a positive value if b > a (Ex: `(a, b) => a - b`)
 */
export const sort = <T>(array: Array<T>, sortFn: ComparerFn<T>): T[] => (arrayCopy(array) || []).sort(sortFn);
