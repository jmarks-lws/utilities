import { isArray } from '../arrays/isArray';
import { isDefinedObject } from '../objects/isDefinedObject';

/**
 * Returns an appropriate string value for `x`. If `x` is an array or object, this will be a JSON
 * representation. `null` and `undefined` will be converted to an empty string. Otherwise this will
 * return the result of built in .toString().
 */
export const strVal = (
  x: unknown,
): string => ((isDefinedObject(x) || isArray(x)) ? JSON.stringify(x) : `${x || ''}`);
