import { Hash } from '../objects/types/Hash';
import { reduce } from './reduce';

/**
 * Returns a sum of a provided field from the elements in `array`.
 * @param array - The source array
 * @param field - Which field to sum. If the value of any instance of this property in any element cannot be parsed to an Integer, the result will be NaN
 */
export const sum = <T>(array: T[], field: keyof T) => reduce(
  array,
  (prev, cur) => prev + parseFloat(`${cur[field]}`),
  0,
);
