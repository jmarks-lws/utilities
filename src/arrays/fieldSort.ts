import { arrayCopy } from './arrayCopy';
import { Hash } from '../objects/types/Hash';

/**
 * Returns a NEW array that has been sorted by the provided field. This uses a `<` comparison operator internally, so
 * the rules which apply to comparing strings will apply to this sort. If you want more control over how this works,
 * you should use `sort()` and provide your own sortFn implementation. (Note: The original array is unaffected.)
 * @param array - The array to sort
 * @param fieldName - A field name that will be expected to exist on all objects in the provided array and which will be used to sort the resulting array.
 */
export const fieldSort = <T extends Hash>(array: Array<T>, fieldName: keyof T): T[] => (
  arrayCopy(array) || []
).sort((a, b) => (a[fieldName] < b[fieldName] ? -1 : 1));
