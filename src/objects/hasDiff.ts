import { diff } from './diff';
import { Hash } from './types/Hash';
import { keys } from './keys';

/**
 * Returns a boolean indicating whether the two provided objects have different data.
 * @param a
 * @param b
 */
export const hasDiff = (a: Hash, b: Hash) => keys(diff(a, b)).length > 0;
