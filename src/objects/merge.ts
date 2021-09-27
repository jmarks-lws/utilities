import { arrayEmpty } from '../arrays/arrayEmpty';
import { Hash } from './types/Hash';
import { head } from '../arrays/first';
import { tail } from '../arrays/tail';

/**
 * Returns a new object that is the result of merging together a series of objects. Values to the right
 * overwrite values before them.
 * @param {Hash[]} objects - As many hashes as you like to merge together from left to right.
 */
export function merge<A extends Hash>(a: A): A;
export function merge<A extends Hash, B extends Hash>(a: A, b: B): A & B;
export function merge<A extends Hash, B extends Hash, C extends Hash>(a: A, b: B, c: C): A & B & C;
export function merge<A extends Hash, B extends Hash, C extends Hash, D extends Hash>(
  a: A, b: B, c: C, d: D
): A & B & C & D;
export function merge<A extends Hash, B extends Hash, C extends Hash, D extends Hash, E extends Hash>(
  a: A, b: B, c: C, d: D, e: E
): A & B & C & D & E;
export function merge<A extends Hash, B extends Hash, C extends Hash, D extends Hash, E extends Hash, F extends Hash>(
  a: A, b: B, c: C, d: D, e: E, f: F
): A & B & C & D & E & F;
export function merge <T extends any, U extends Record<keyof T, unknown>>(
  ...objects: U[]
): T {
  const [a, b, c, d, e, f, g, h] = objects;
  return ({
    ...(head(objects) ?? {}),
    ...(!arrayEmpty(tail(objects)) ? merge(b, c, d, e, f, g) : null),
  } as T);
}
