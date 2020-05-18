import { isArray } from './isArray';
import { reduce } from './reduce';
import { slice } from './slice';

/**
 * Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
 * @param arr
 * @param d
 */
export const flatten = (arr: any[], d = 1): any[] => (d > 0
  ? reduce(arr, (acc, val) => acc.concat(isArray(val) ? flatten(val, d - 1) : val), [])
  : slice(arr)
);
