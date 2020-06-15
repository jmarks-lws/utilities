import { arrayCopy } from './arrayCopy';

/**
 * Returns a new array that is the result of reversing the order of the elements in `array`
 */
export const reverse = (
  array: any[],
): any[] => (arrayCopy(array)?.reverse()!);
