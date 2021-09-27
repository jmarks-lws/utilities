import { Hash } from './types/Hash';
import { reverse } from '../arrays/reverse';
import { merge } from './merge';

/**
 * Returns a new object that is the result of merging together a series of objects going from the last to
 * the first objects. Values to the left overwrite values to their right.
 * @param {Hash[]} objects - As many hashes as you like to merge together from left to right.
 */
export function mergeRight<A extends Hash>(a: A): A;
export function mergeRight<A extends Hash, B extends Hash>(a: A, b: B): A & B;
export function mergeRight<A extends Hash, B extends Hash, C extends Hash>(a: A, b: B, c: C): A & B & C;
export function mergeRight<A extends Hash, B extends Hash, C extends Hash, D extends Hash>(
  a: A, b: B, c: C, d: D
): A & B & C & D;
export function mergeRight<A extends Hash, B extends Hash, C extends Hash, D extends Hash, E extends Hash>(
  a: A, b: B, c: C, d: D, e: E
): A & B & C & D & E;
export function mergeRight<
  A extends Hash, B extends Hash, C extends Hash, D extends Hash, E extends Hash, F extends Hash
>(
  a: A, b: B, c: C, d: D, e: E, f: F
): A & B & C & D & E & F;
export function mergeRight <T extends any, U extends Record<keyof T, unknown>>(...objects: U[]): T {
  const [a, b, c, d, e, f, ...rest] = reverse(objects);
  return merge(a, b, c, d, e, f);
}
