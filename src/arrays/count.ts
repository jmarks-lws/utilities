import { isArray } from './isArray';

/**
 * Returns number of elements in `array`.
 * @param array - The source array
 */
export const count = (array: any[]): number => (
  !isArray(array)
    ? count([array].filter((a) => ![null, undefined].includes(a as any)))
    : array.length
);
