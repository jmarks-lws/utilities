import { Hash } from './types/Hash';
import { keys } from './keys';

/**
 * Returns a boolean indicating whether a given key exists in the provided object.
 * @param o
 * @param k
 */
export const hasKey = <T extends Hash, K extends keyof T>(o: T, k: K | string): boolean => keys(o).includes(k);
