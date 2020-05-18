import { slice } from './slice';

/**
 * Returns a new array that is the result of inserting `element` to `array` at position `index`
 * @param array - The source array
 * @param element - The element to add to the resulting array
 * @param index - Where to place the element
 */
export const insertAt = <T>(array: Array<T>, index: number, element: T) => [
  ...slice(array, 0, index), element, ...slice(array, index),
];
