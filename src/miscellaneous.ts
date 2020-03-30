import { isDefinedObject } from './object';
import { isArray, count } from './array';
import { keys } from '.';

export type Nullable<T> = T | null;
export type Optional<T> = T | null | undefined;

/** Require at least one of `Keys` in the provided object. */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>> & {
      [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

/** Require EXACTLY ONE of `Keys` in the provided object */
export type RequireOnlyOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>> & {
      [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>
  }[Keys]

/** Returns true if `x` is a `number`. NaN is considered a number and so will return `true`. Does not return true for `BigInt`. */
export const isNumber = (x: any) => (typeof x === 'number');
/** Returns true if `x` is a `number` that is not NaN. Does not return true for `BigInt`.  */
export const isValidNumber = (x: any) => isNumber(x) && !Number.isNaN(x);
/** Returns true if `x` is a `number` or a string that can be successfully parsed to a `number` that is not `NaN` */
export const isNumeric = (x: any) => isValidNumber(parseInt(`${x}`, 10));

export const isBigInt = (x: any) => (typeof x === 'bigint');
export const isString = (x: any) => (typeof x === 'string');
export const isSymbol = (x: any) => (typeof x === 'symbol');
export const isBoolean = (x: any) => (typeof x === 'boolean');

export const def = (x: any) => typeof x !== 'undefined';
/** Alias for `def` */ export const isDef = def;
export const undef = (x: any) => !def(x);
/** Alias for `undef` */ export const notDef = undef;
export const isNull = (x: any) => x === null;
export const notNull = (x: any) => !isNull(x);
/**
 * Closely equivalent to PHP's rules for empty().
 *  - Note: Treats both `undefined` and `null` as PHP's `null` for this method.
 * */
export const empty = (x: any) => (
  undef(x) || isNull(x) || x === 0 || x === '' || x === '0' || x === false
  || (isArray(x) && count(x) === 0) || (isDefinedObject(x) && count(keys(x)) === 0)
);
export const notEmpty = (x: any) => !empty(x);

export const boolVal = (x: any): boolean => !!x;
export const floatVal = (x: any): number => parseFloat(x);
export const intVal = (x: any): number => parseInt(x, 10);
export const strVal = (x: any): string => ((isDefinedObject(x) || isArray(x)) ? JSON.stringify(x) : `${x}`);
