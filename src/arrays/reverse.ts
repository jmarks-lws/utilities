import { arrayCopy } from './arrayCopy';

/**
 * Returns a new array that is the result of reversing the order of the elements in `array`
 */
export const reverse = <T>(
  array: T[],
): T[] => (arrayCopy(array)!.reverse());
