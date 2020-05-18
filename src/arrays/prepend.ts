import { concat } from './concat';

/**
 * Concatenates an element on to the beginning of an array.
 * Can be used as an immutable alternative to Array.prototype.unshift();
 *
 * @param array - The original array
 * @param element - The element to append to the new array
 */
export const prepend = <T>(array: T[], element: T) => concat([ element ], array);
