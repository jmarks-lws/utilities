import { Hash } from './types/Hash';
import { keys } from './keys';
import { reduce } from '../arrays/reduce';
import { isPrimitive } from '../misc/isPrimitive';
import { isArray } from '../arrays/isArray';
import { deepCloneArray } from '../arrays/deepCloneArray';

/**
 * Does a deep copy of an object ensuring that reference values are recursively clones such that the resulting
 * object value does not refer to the same memory location that the source object value does. This is usually
 * preferred over the `clone()` method.
 *
 * Note: this is NOT intended for instances of class objects (those created with the `new` keyword, etc.)
 *
 * @param obj Object to copy.
 */
export const deepClone = <T extends Hash>(obj: T): T => {
  const out = reduce(keys(obj), (acc, key) => {
    const val = obj[key];
    const copiedValue = (
      isPrimitive(val) // eslint-disable-line no-nested-ternary
        ? val
        : (isArray(val) ? deepCloneArray(val) : deepClone(val))
    );
    return {
      ...acc,
      [key]: copiedValue,
    };
  }, {} as T);
  return out;
};
