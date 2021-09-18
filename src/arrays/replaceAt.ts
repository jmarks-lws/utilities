import { slice } from './slice';

/**
 * Returns a new array that is the result of replacing the element at `index` in `array` with the new `element`
 * @param array - The source array
 * @param element - The element to add to the resulting array
 * @param index - Where to place the element
 */
export const replaceAt = <T extends unknown>(array: T[], index: number, element: T) => [
  ...slice(array, 0, index), element, ...slice(array, index + 1),
];
