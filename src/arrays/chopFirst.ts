import { arrayWrap } from './arrayWrap';
import { slice } from './slice';

/**
 * Retreives the first `n` elements from `array` and returns as a new Array.
 */
export const chopFirst = <T>(array: T[], n: number = 1): T[] => slice(arrayWrap(array), 0, n);
