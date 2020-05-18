import { concat } from './concat';

/**
 * Concatenates an element on to the end of an array.
 * Can be used as an immutable alternative to Array.prototype.push();
 *
 * @param array - The original array
 * @param element - The element to append to the new array
 */
export const append = <T>(array: T[], element: T) => concat(array, [ element ]);
