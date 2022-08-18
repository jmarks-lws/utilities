import { FilterFn } from './types/FilterFn';
import { sum } from './sum';
import { where } from './where';

/**
 * Returns a sum of a provided field matching a given condition from the elements in `array`.
 * @param array - The source array
 * @param fn - Function used to filter the source list.
 * @param sumField - Which field to sum. If the value of any instance of this property in any element cannot be parsed to an Integer, the result will be NaN
 */
export const sumWhere = <T>(
  array: Array<T>,
  fn: FilterFn<T>,
  sumField: keyof T,
) => sum(where(array, fn), sumField);
