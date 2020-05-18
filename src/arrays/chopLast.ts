import { chopFirst } from './chopFirst';
import { reverse } from './reverse';

/**
 * Retreives the last `n` elements from `array` and returns as a new Array.
 */
export const chopLast = (xs: any[], n: number = 1): any => reverse(chopFirst(reverse(xs), n));
