import { undef } from './undef';
import { NotUndefined } from './types/NotUndefined';

/** Returns true if `x` is not undefined. This will return true for `null`. */
export const def = (x: any): x is NotUndefined => !undef(x);
/** Alias for `def` */ export const isDef = def;
/** Alias for `def` */ export const isDefined = def;
