import { isNull } from '../misc/isNull';

/** Returns a boolean indicating whether `x` is a non null object. Does not return true for an array or a null value. */
export const isDefinedObject = (
  x: any,
) => (!Array.isArray(x)) && (typeof x === 'object') && !isNull(x);
