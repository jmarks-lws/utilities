import { undef } from './undef';
import { isNull } from './isNull';
import { count } from '../arrays/count';
import { isArray } from '../arrays/isArray';
import { isDefinedObject } from '../objects/isDefinedObject';
import { keys } from '../objects/keys';

/**
 * Closely equivalent to PHP's rules for empty().
 *  - Note: Treats both `undefined` and `null` as PHP's `null` for this method.
 * */
export const empty = (x: any): boolean => (
  undef(x) || isNull(x) || x === 0 || x === '' || x === '0' || x === false
  || (isArray(x) && count(x) === 0) || (isDefinedObject(x) && count(keys(x)) === 0)
);
