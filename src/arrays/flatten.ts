import { isArray } from './isArray';
import { reduce } from './reduce';
import { slice } from './slice';

/**
 * Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
 * @param arr
 * @param d
 */
export const flatten = <T extends unknown>(arr: T[], d = 1): T[] => (
  d > 0
    ? reduce(arr, (acc, val) => acc.concat(isArray(val) ? flatten(val, d - 1) : val), [] as T[])
    : slice(arr)
);
