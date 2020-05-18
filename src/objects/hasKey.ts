import { Hash } from './types/Hash';
import { keys } from './keys';

/**
 * Returns a boolean indicating whether a given key exists in the provided object.
 * @param o
 * @param k
 */
export const hasKey = (o: Hash, k: string): boolean => keys(o).includes(k);
