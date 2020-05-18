import { HashOf } from './types/HashOf';
import { keys } from './keys';
import { map } from '../arrays/map';

/**
 * Performs a map operation on all keys of the provided object
 * @param o
 * @param fn
 */
export const mapKeys = <T, U>(o: HashOf<T>, fn: ((k: string, i: number) => U)): U[] => map(keys(o), fn);
