import { isDefinedObject } from './object';
import { isArray, count } from './array';
import { keys } from '.';

export const isNumber = (x: any) => (typeof x === 'number');

export type Nullable<T> = T | null;
export type Optional<T> = T | null | undefined;

export const def = (x: any) => typeof x !== 'undefined';
export const undef = (x: any) => !def(x);
export const isNull = (x: any) => x === null;
export const notNull = (x: any) => !isNull(x);
export const empty = (x: any) => (
  undef(x) || isNull(x) || x === 0 || x === '' || x === '0' || x === false
  || (isArray(x) && x.length === 0) || (isDefinedObject(x) && count(keys(x)) === 0)
);
export const notEmpty = (x: any) => !empty(x);

export const boolVal = (x: any): boolean => !!x;
export const floatVal = (x: any): number => parseFloat(x);
export const intVal = (x: any): number => parseInt(x, 10);
export const strVal = (x: any): string => ((isDefinedObject(x) || isArray(x)) ? JSON.stringify(x) : `${x}`);
