import { slice } from './slice';

/**
 * Retreives the last `n` elements from `array` and returns as a new Array.
 */
export const chopLast = <T>(xs: T[], n: number = 1): T[] => slice(xs, -n);
