import { slice } from './slice';

/**
 * Returns a new array that is the result of removing the element at position `index` from `array`
 * @param array - The source array
 * @param index - The index of the element to remove
 */
export const removeAt = <T>(array: Array<T>, index: number) => [
  ...slice(array, 0, index), ...slice(array, index + 1),
];
