import { Hash } from './types/Hash';

/**
 * Does a shallow copy of an object. Not usually what you want as it maintains references
 * when values are reference types. If you need something more complete, use `deepClone()`.
 *
 * Note: this is NOT intended for instances of class objects (those created with the `new` keyword, etc.)
 *
 * @param obj Object to copy.
 */
export const clone = <T extends Hash>(obj: T): T => ({ ...obj });
