import { isPrimitive } from '../misc/isPrimitive';
import { deepClone } from '../objects/deepClone';

/**
 * Clones `array` ensuring reference types are copied by value and not by reference.
 *
 * ! Warning: This could result in infinite recursion if circular references exist inside the object.
 *
 * @param array Array to clone
 */
export const deepCloneArray = <T>(array: T[]): T[] => array.map(
  (x) => (
    isPrimitive(x) // eslint-disable-line no-nested-ternary
      ? x
      : (Array.isArray(x) ? deepCloneArray(x) : deepClone(x)) as any
  ),
);
