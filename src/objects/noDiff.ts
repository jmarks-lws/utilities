import { hasDiff } from './hasDiff';
import { Hash } from './types/Hash';

/**
 * Returns a boolean indicating whether the two provided objects do NOT have different data.
 * @param a
 * @param b
 */
export const noDiff = <T1 extends Hash, T2 extends Hash>(a: T1, b: T2): boolean => !hasDiff(a, b);
