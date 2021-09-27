import { diff } from './diff';
import { Hash } from './types/Hash';
import { keys } from './keys';

/**
 * Returns a boolean indicating whether the two provided objects have different data.
 * @param a
 * @param b
 */
export const hasDiff = <T1 extends Hash, T2 extends Hash>(a: T1, b: T2): boolean => keys(diff(a, b)).length > 0;
