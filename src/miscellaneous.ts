import { isDefinedObject } from './object';
import { isArray, count } from './array';
import { keys } from '.';

/** Helper type: T | null */
export type Nullable<T> = T | null;
/** Helper type: T | null | undefined */
export type Optional<T> = T | null | undefined;

/** Require at least one of `Keys` in the provided object. */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>> & {
      [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys];

/** Require EXACTLY ONE of `Keys` in the provided object */
export type RequireOnlyOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>> & {
      [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>
  }[Keys];

/** Returns true if `x` is a `number`. NaN is considered a number and so will return `true`. Does not return true for `BigInt`. */
export const isNumber = (x: any) => (typeof x === 'number');
/** Returns true if `x` is a `number` that is not NaN. Does not return true for `BigInt`.  */
export const isValidNumber = (x: any) => isNumber(x) && !Number.isNaN(x);
/** Returns true if `x` is a `number` with no fractional data. */
export const isIntegerNumber = (x: any) => (typeof x === 'number') && x === Math.floor(x);
/** Returns true if `x` is a `number` or a string that can be successfully parsed to a `number` that is not `NaN` */
export const isNumeric = (x: any) => isValidNumber(Number.parseFloat(`${x}`));

/** Returns true if `x` is a `bigint`. Does not return true for `Number`. */
export const isBigInt = (x: any) => (typeof x === 'bigint');
/** Returns true if `x` is a `string`. */
export const isString = (x: any) => (typeof x === 'string');
/** Returns true if `x` is a `symbol`. */
export const isSymbol = (x: any) => (typeof x === 'symbol');
/** Returns true if `x` is a `boolean`. */
export const isBoolean = (x: any) => (typeof x === 'boolean');

/** Returns true if `x` is not undefined. This will return true for `null`. */
export const def = (x: any) => typeof x !== 'undefined';
/** Alias for `def` */ export const isDef = def;
/** Returns true if `x` is undefined. */
export const undef = (x: any) => typeof x === 'undefined';
/** Alias for `undef` */ export const notDef = undef;
/** Returns true if `x` is `null` */
export const isNull = (x: any) => x === null;
/** Returns true if `x` is NOT `null` */
export const notNull = (x: any) => !isNull(x);

/** Convenience function. Returns true if the type of the provided value is a primitive type */
export const isPrimitive = (x: any) => (
  isString(x) || isNumber(x) || isBigInt(x) || isBoolean(x) || isNull(x) || isSymbol(x) || undef(x)
);
/** Convenience function. Returns true if the type of the provided value is a reference type */
export const isReference = (x: any) => !isPrimitive(x);

/**
 * Closely equivalent to PHP's rules for empty().
 *  - Note: Treats both `undefined` and `null` as PHP's `null` for this method.
 * */
export const empty = (x: any) => (
  undef(x) || isNull(x) || x === 0 || x === '' || x === '0' || x === false
  || (isArray(x) && count(x) === 0) || (isDefinedObject(x) && count(keys(x)) === 0)
);
/**
 * Opposite of `empty()`.
 */
export const notEmpty = (x: any) => !empty(x);

/** Returns `true` if `x` is "truthy" and `false` if `x` is "falsey". */
export const boolVal = (x: any): boolean => !!x;
/** Returns a fractional numeric representation of an input value. This may return NaN */
export const floatVal = (x: any): number => ((typeof x === 'number') ? x : parseFloat(x));
/** Returns a non-fractional (integer) numeric representation of an input value. This may return NaN */
export const intVal = (x: any): number => parseInt(x, 10);
/** Returns an appropriate string value for `x`. If `x` is an array or object, this will be a JSON representation. Otherwise it will be the result of built in .toString() */
export const strVal = (x: any): string => ((isDefinedObject(x) || isArray(x)) ? JSON.stringify(x) : `${x || ''}`);
