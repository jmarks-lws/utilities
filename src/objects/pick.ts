import { reduce } from '../arrays/reduce';
import { intersect } from '../arrays/intersect';
import { Hash } from './types/Hash';
import { keys } from './keys';

/**
 * Returns a new object that is the result of projecting only the properties of `obj` listed in `fields`.
 *
 * @param obj - The source object from which to construct a result with its fields selected.
 * @param fields - A string array containing the names of fields to remove
 */
export const pick = <T extends Hash, K extends keyof T>(obj: T, fields: Array<K>): Partial<T> => (
  reduce(
    intersect(keys(obj), fields as string[]),
    (prev: Hash, f: any) => ({ ...prev, [f]: obj[f] }),
    {} as Partial<T>,
  )
);
