import { strVal } from '../misc/strVal';
import { Hash } from './types/Hash';
import { keys } from './keys';
import { reduce } from '../arrays/reduce';

/**
 * Returns a new object where the keys and corresponding values of `obj` have been swapped with each other.
 * @param obj Object to invert
 */
export const invert = (
  obj: Hash,
): Hash => reduce(keys(obj), (acc: Hash, key) => ({ ...acc, [strVal(obj[key])]: key }), {} as Hash);
