import { isNumber } from './isNumber';

/** Returns true if `x` is a `number` that is not NaN. Does not return true for `BigInt`.  */
export const isValidNumber = <T extends any>(x: T): boolean => isNumber(x) && !Number.isNaN(x);
