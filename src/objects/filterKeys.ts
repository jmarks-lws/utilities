import { filter } from '../arrays/where';
import { Hash } from './types/Hash';
import { keys } from './keys';
import { pick } from './pick';

/**
 * Returns a new object with a subset of properties where only properties with keys that pass the provided filter are returned.
 * @param o
 */
export const filterKeys = <T extends Hash>(o: T, filterFn: (k: keyof T) => boolean): Partial<T> => pick(
  o, filter(
    keys(o),
    (key) => filterFn(key),
  ),
);
