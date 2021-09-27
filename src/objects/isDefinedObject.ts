import { isNull } from '../misc/isNull';
import { Hash } from './types/Hash';

/** Returns a boolean indicating whether `x` is a non null object. Does not return true for an array or a null value. */
export const isDefinedObject = (
  x: unknown,
): x is Hash => (!Array.isArray(x)) && (typeof x === 'object') && !isNull(x);
