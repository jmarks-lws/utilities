import { chopLast } from './chopLast';
import { count } from './count';
import { min } from './min';

/**
 * Returns a new Array consisting of the elements of `array` that would remain after dropping the first `n` elements.
 */
export const dropFirst = <T>(array: T[], n: number = 0): T[] => chopLast(array, count(array) - min([n, count(array)]));
