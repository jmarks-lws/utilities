import { isValidNumber } from './isValidNumber';

/** Returns true if `x` is a `number` or a string that can be successfully parsed to a `number` that is not `NaN` */
export const isNumeric = (x: any): boolean => isValidNumber(Number.parseFloat(`${x}`));
