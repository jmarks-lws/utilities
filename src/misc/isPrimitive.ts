import { isString } from './isString';
import { isNumber } from './isNumber';
import { isBigInt } from './isBigInt';
import { isNull } from './isNull';
import { undef } from './undef';
import { isBoolean } from './isBoolean';
import { isSymbol } from './isSymbol';

/**
 * Convenience function. Returns true if the type of the provided value is a primitive type.
 *
 * NOTE: `undefined` is a primitive value and will cause this function to return `true`
 */
export const isPrimitive = (x: unknown): x is string | number | bigint | boolean | null | symbol | undefined => (
  isString(x) || isNumber(x) || isBigInt(x) || isBoolean(x) || isNull(x) || isSymbol(x) || undef(x)
);
