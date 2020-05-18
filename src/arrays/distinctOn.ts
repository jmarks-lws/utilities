import { EqualityFn } from './types/EqualityFn';
import { hasAny } from './hasAny';
import { Hash } from '../objects/types/Hash';
import { reduce } from './reduce';

/**
 * Returns a new array where only one of each "same" object is returned. Sameness is determined by `equality`.
 * @param array - The array to filter.
 * @param equality - A function used to determine whether any two elements are equal. Return `true` for equal and `false` for not equal.
 */
export const distinctOn = <T extends Hash>(
  array: Array<T>,
  equality: EqualityFn<T>,
) => reduce(array, (acc, el) => (
    hasAny(acc, (accEl) => equality(el, accEl)) ? [...acc] : [...acc, el ]
  ), [] as T[]);
