import { isNull } from '../misc/isNull';
import { undef } from '../misc/undef';
import { isPrimitive } from '../misc/isPrimitive';
import { ArrayMergeMethod } from './types/ArrayMergeMethod';
import { reduce } from './reduce';
import { replaceAt } from './replaceAt';
import { isArray } from './isArray';
import { arrayCopy } from './arrayCopy';
import { concat } from './concat';
import { distinct } from './distinct';
import { deepMerge } from '../objects/deepMerge';
import { InvalidParameterError } from '../misc/types/InvalidParameterError';
import { sameType } from '../misc/sameType';

/**
 *
 * @param a
 * @param b
 * @param arrayMergeMethod
 */
export const deepMergeArrays = <T extends unknown>(
  a: T[],
  b: T[],
  arrayMergeMethod: ArrayMergeMethod = 'concatOnly',
): T[] => {
  switch (arrayMergeMethod) {
    case 'index':
      return reduce(b, (acc, curr, index) => {
        const aValue = a?.[index];
        if (
          isPrimitive(curr)
          || curr === aValue
          || !sameType(curr, aValue)
          || undef(aValue)
          || isNull(aValue)
          || isNull(curr)
        ) {
          return replaceAt(acc, index, curr);
        }
        if (isArray(curr) && isArray(aValue)) {
          return replaceAt(acc, index, deepMergeArrays(aValue, curr, arrayMergeMethod) as T);
        }
        return replaceAt(acc, index, deepMerge(aValue as Partial<T>, curr as Partial<T>, arrayMergeMethod) as T);
      }, arrayCopy(a) || []);
    case 'value':
      return distinct(concat(a, b));
    case 'concatOnly':
      return concat(a, b);
    default:
      throw new InvalidParameterError('Must provide a valid arrayCopyMethod');
  }
};
