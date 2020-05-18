import { Hash } from './types/Hash';
import { prune } from '../arrays/prune';
import { keys } from './keys';
import { pick } from './pick';

/**
 * Returns a new object that is the result of projecting only the properties of `o` not listed in `fields`.
 *
 * @param fields - A string array containing the names of fields to remove
 * @param o - The source object from which to construct a result with its fields removed.
 */
export const pickNot = <T extends Hash>(obj: T, fields: Array<keyof T>): Partial<T> => pick(
  obj, prune(keys(obj), fields as string[]),
);
