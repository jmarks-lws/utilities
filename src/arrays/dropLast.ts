import { chopFirst } from './chopFirst';
import { count } from './count';
import { min } from './min';

/**
 * Returns a new Array consisting of the elements of `array` that would remain after dropping the last `n` elements.
 */
export const dropLast = <T>(array: T[], n: number = 0): T[] => chopFirst(array, count(array) - min([n, count(array)]));
