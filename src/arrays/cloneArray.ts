import { isArray } from './isArray';
import { isPrimitive } from '../misc/isPrimitive';
import { clone } from '../objects/clone';

/**
 * Clones each of `array`'s individual elements using shallow cloning (`clone` from the object subset
 * of utilities). Cloned reference values will copy by reference. While this is sometimes useful, you
 * will usually want `deepCloneArray()`
 *
 * @param array Array to clone
 */
export const cloneArray = <T>(array: T[]): T[] => array.map(
  (x) => (
    isPrimitive(x) // eslint-disable-line no-nested-ternary
      ? x
      : (isArray(x) ? x : clone(x))
  ),
);
