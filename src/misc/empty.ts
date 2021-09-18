import { undef } from './undef';
import { isNull } from './isNull';
import { count } from '../arrays/count';
import { isArray } from '../arrays/isArray';
import { isDefinedObject } from '../objects/isDefinedObject';
import { keys } from '../objects/keys';

/**
 * Closely equivalent to PHP's rules for empty().
 *  - Note: Treats both `undefined` and `null` as PHP's `null` for this method.
 * Returns true if x is undefined, null, 0, '' (empty string), '0', false, an empty array or an object with no keys.
 * */
export const empty = (x: unknown): boolean => (
  undef(x) || isNull(x) || x === 0 || x === '' || x === '0' || x === false
  || (isArray(x) && count(x) === 0) || (isDefinedObject(x) && count(keys(x)) === 0)
);
