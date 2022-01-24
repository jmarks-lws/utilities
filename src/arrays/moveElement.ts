import { insertAt } from './insertAt';
import { removeAt } from './removeAt';

/**
 * Returns a new array that is the result of removing the element at position `fromIndex` from `array`
 * and placing it back into the copied array at position `toIndex`.
 *
 * @param array - The source array
 * @param fromIndex - The index of the element to remove
 * @param toIndex - The index at which to insert the removed element
 */
export const moveElement = <T>(
  array: T[],
  fromIndex: number,
  toIndex: number,
) => insertAt(removeAt(array, fromIndex), toIndex, array[fromIndex]);
