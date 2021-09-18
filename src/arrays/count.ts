import { isArray } from './isArray';

/**
 * Returns number of elements in `array`.
 * @param array - The source array
 */
export const count = <T>(array: T[]): number => (
  !isArray(array)
    ? count([array].filter((a) => ![null, undefined].includes(a)))
    : array.length
);
