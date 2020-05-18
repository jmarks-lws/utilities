import { hasAny } from './hasAny';
import { hasDiff } from '../objects/hasDiff';
import { Hash } from '../objects/types/Hash';
import { pick } from '../objects/pick';
import { reduce } from './reduce';

/**
 * Returns a new array where only one of each "same" object is returned. Sameness is determined by comparing
 * the values of all of the field names indicated in `fieldsToCompare`. Note that reference value types will
 * not be considered equal unless the two values refer to the exact same referenced object in memory.
 * @param array - The array to filter
 * @param fieldsToCompare - The field names of objects in the array to compare.
 */
export const distinctOnFields = <T extends Hash>(
  array: Array<T>,
  fieldsToCompare: Array<keyof T>,
) => reduce(array, (acc, el) => (
    hasAny(acc, (accEl) => !hasDiff(pick(accEl, fieldsToCompare as string[]), pick(el, fieldsToCompare as string[])))
      ? [...acc]
      : [...acc, el ]
  ), [] as T[]);
