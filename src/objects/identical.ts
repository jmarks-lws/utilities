import { count } from '../arrays/count';
import { Hash } from './types/Hash';
import { keys } from './keys';
import { diff } from './diff';

/**
 * Compares two objects. If you were to print out the values of both objects on paper and they would
 * both look identical, this function would return `true` when provided those two objects - regardless
 * of whether the two items being compared are actually the same object stored in the same part of the
 * computer's memory.
 *
 * @param a First object to compare.
 * @param b Second object to compare.
 */
export const identical = (a: Hash, b: Hash) => count(keys(diff(a, b))) === 0;
