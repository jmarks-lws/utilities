import { hasDiff } from './hasDiff';
import { Hash } from './types/Hash';

/**
 * Returns a boolean indicating whether the two provided objects do NOT have different data.
 * @param a
 * @param b
 */
export const noDiff = (a: Hash, b: Hash) => !hasDiff(a, b);
