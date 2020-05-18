import { where } from './where';

/**
 * Returns a new array that is the result of removing `element` from `array`.
 * ! This may remove multiple elements if multiple matches are found.
 * @param array - The source array
 * @param element - The element to omit from the resulting array
 */
export const omit = <T>(array: Array<T>, element: T) => where(array, (e) => e !== element);
