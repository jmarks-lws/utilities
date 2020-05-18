import { where } from './where';
import { FilterFn } from './types/FilterFn';

export const whereNot = <T>(
  array: Array<T>,
  whereFn: FilterFn<T>,
) => where(array, (x, i, m) => !whereFn(x, i, m));
