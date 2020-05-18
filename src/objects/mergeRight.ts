import { Hash } from './types/Hash';
import { reverse } from '../arrays/reverse';
import { merge } from './merge';

/**
 * Returns a new object that is the result of merging together a series of objects going from the last to
 * the first objects. Values to the left overwrite values to their right.
 * @param {Hash[]} a - As many hashes as you like to merge together from left to right.
 */
export const mergeRight = <T extends Hash>(...a: Partial<T>[]): T => merge(...reverse(a));
