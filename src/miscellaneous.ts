import { isDefinedObject } from './object';
import { isArray, count } from './array';
import { keys, Hash } from '.';

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

export type NotUndefined = string | number | bigint | boolean | null | symbol | object | Array<any> | Hash;

/** Returns true if `x` is a `number`. NaN is considered a number and so will return `true`. Does not return true for `BigInt`. */
export const isNumber = (x: any): x is number => (typeof x === 'number');
/** Returns true if `x` is a `number` that is not NaN. Does not return true for `BigInt`.  */
export const isValidNumber = <T extends any>(x: T): boolean => isNumber(x) && !Number.isNaN(x);
/** Returns true if `x` is a `number` with no fractional data. */
export const isIntegerNumber = (x: any): boolean => (typeof x === 'number') && x === Math.floor(x);
/** Returns true if `x` is a `number` or a string that can be successfully parsed to a `number` that is not `NaN` */
export const isNumeric = (x: any): boolean => isValidNumber(Number.parseFloat(`${x}`));

/** Returns true if `x` is a `bigint`. Does not return true for `Number`. */
export const isBigInt = (x: any): x is BigInt => (typeof x === 'bigint');
/** Returns true if `x` is a `string`. */
export const isString = (x: any): x is string => (typeof x === 'string');
/** Returns true if `x` is a `symbol`. */
export const isSymbol = (x: any): x is Symbol => (typeof x === 'symbol');
/** Returns true if `x` is a `boolean`. */
export const isBoolean = (x: any): x is boolean => (typeof x === 'boolean');

/** Returns true if `x` is undefined. */
export const undef = (x: any): x is undefined => typeof x === 'undefined';
/** Alias for `undef` */ export const notDef = undef;
/** Returns true if `x` is not undefined. This will return true for `null`. */
export const def = (x: any): x is NotUndefined => !undef(x);
/** Alias for `def` */ export const isDef = def;
/** Returns true if `x` is `null` */
export const isNull = (x: any): x is null => x === null;
/** Returns true if `x` is NOT `null` */
export const notNull = (x: any) => !isNull(x);

const a: string | undefined = 'abc';
const b: string | undefined = undefined;
const d: string = def(b) ? b : 'not defined';

/** Convenience function. Returns true if the type of the provided value is a primitive type */
export const isPrimitive = (x: any): x is string | number | bigint | boolean | null | symbol | undefined => (
  isString(x) || isNumber(x) || isBigInt(x) || isBoolean(x) || isNull(x) || isSymbol(x) || undef(x)
);
/** Convenience function. Returns true if the type of the provided value is a reference type */
export const isReference = (x: any): x is object => !isPrimitive(x);

/**
 * Closely equivalent to PHP's rules for empty().
 *  - Note: Treats both `undefined` and `null` as PHP's `null` for this method.
 * */
export const empty = (x: any): boolean => (
  undef(x) || isNull(x) || x === 0 || x === '' || x === '0' || x === false
  || (isArray(x) && count(x) === 0) || (isDefinedObject(x) && count(keys(x)) === 0)
);
/**
 * Opposite of `empty()`.
 */
export const notEmpty = (x: any): boolean => !empty(x);

/** Returns `true` if `x` is "truthy" and `false` if `x` is "falsey". */
export const boolVal = (x: any): boolean => !!x;
/** Returns a fractional numeric representation of an input value. This may return NaN */
export const floatVal = (x: any): number => ((typeof x === 'number') ? x : parseFloat(x));
/** Returns a non-fractional (integer) numeric representation of an input value. This may return NaN */
export const intVal = (x: any): number => parseInt(x, 10);
/**
 * Returns an appropriate string value for `x`. If `x` is an array or object, this will be a JSON
 * representation. `null` and `undefined` will be converted to an empty string. Otherwise this will
 * return the result of built in .toString().
 */
export const strVal = (x: any): string => ((isDefinedObject(x) || isArray(x)) ? JSON.stringify(x) : `${x || ''}`);

/**
 * Determines whether the given string is either 'true' or 'false' (case insensitive).
 * @param s - String to test
 */
export const isBoolString = (s: string): s is 'true' | 'false' => ['true', 'false'].includes(s.toLowerCase());

/**
 * Returns `true` if the provided string is the string 'true' (case insensitive), otherwise returns `false`.
 * @param s - String to convert to boolean.
 */
export const stringToBool = (s: string): boolean => (s.toLowerCase() === 'true');

/**
 * Attempts to convert a string environment variable to its appropriate JS data type. If it appears numeric, it will return a Number.
 * If it appears to be a boolean string, it will return a boolean value. Otherwise it will return the provided string.
 * @param env - The environment variable value to convert to its appropriate type. Use 'as <Type>' to provide relevant data type for application.
 */
export const envToType = (env: string): any => (
  // eslint-disable-next-line no-nested-ternary
  isNumeric(env)
    ? floatVal(env)
    : (isBoolString(env) ? stringToBool(env) : env as string)
);
