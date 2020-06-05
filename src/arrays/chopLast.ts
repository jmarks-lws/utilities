import { slice } from './slice';

/**
 * Retreives the last `n` elements from `array` and returns as a new Array.
 */
export const chopLast = (xs: any[], n: number = 1): any => slice(xs, -n);
