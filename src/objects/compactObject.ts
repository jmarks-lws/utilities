import { filter } from '../arrays/where';
import { Hash } from './types/Hash';
import { keys } from './keys';
import { pick } from './pick';

/**
 * Returns a new object with a subset of properties where properties which have null or undefined values have been removed.
 * @param o
 */
export const compactObject = <T extends Hash>(o: T, allowNulls = false): Partial<T> => pick(
  o, filter(
    keys(o),
    (key) => o[key] !== undefined && (allowNulls || o[key] !== null),
  ),
);
