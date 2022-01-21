import { FilterFn } from './types/FilterFn';
import { flattenOnce } from './flattenOnce';

/**
 * Returns a multiple element array. Each array other than the last is the result of applying the filterFns, in order.
 * The last returned array is any items that were not included in the other arrays.
 *
 * WARNING: the provided `filterFns` may overlap. If this is not desired, it is up to the consuming application to ensure overlap does not happen.
 *
 * @param array - The source array to query against.
 * @param filterFns - A series of lambdas that describe elements to match.
 */
export const multiPartition = <T>(items: T[], filterFns: FilterFn<T>[]): T[][] => {
  const filteredResults = filterFns.reduce((acc, filterFn) => [
    ...acc,
    items.filter((item, i) => filterFn(item, i, items)),
  ], [] as T[][]);

  const flatFiltered = flattenOnce(filteredResults);

  const rest = items.filter((item) => !flatFiltered.includes(item));

  return [
    ...filteredResults,
    rest,
  ];
};
