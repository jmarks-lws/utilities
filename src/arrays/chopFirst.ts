import { slice } from './slice';
import { arrayWrap } from './arrayWrap';
/**
 * Retreives the first `n` elements from `array` and returns as a new Array.
 */
export const chopFirst = (array: any[], n: number = 1): any => slice(arrayWrap(array), 0, n);
