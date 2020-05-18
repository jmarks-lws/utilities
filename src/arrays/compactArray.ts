import { where } from './where';

/**
 * Removes elements which are null or undefined.
 * @param array - The source array
 */
export const compactArray = (array: any[], allowNulls = false) => (
  where(array, (x) => x !== undefined && (allowNulls || x !== null))
);
