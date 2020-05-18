import { isPrimitive } from '../misc/isPrimitive';
import { isDefinedObject } from '../objects/isDefinedObject';
import { ArrayMergeMethod } from './types/ArrayMergeMethod';
import { reduce } from './reduce';
import { replaceAt } from './replaceAt';
import { isArray } from './isArray';
import { arrayCopy } from './arrayCopy';
import { concat } from './concat';
import { distinct } from './distinct';
import { deepMerge } from '../objects/deepMerge';
import { InvalidParameterError } from '../misc/types/InvalidParameterError';

export const deepMergeArrays = <T>(
  a: T[],
  b: T[],
  arrayMergeMethod: ArrayMergeMethod = 'concatOnly',
): T[] => {
  switch (arrayMergeMethod) {
    case 'index':
      return reduce(b, (acc, curr, index) => {
        const aValue = a[index];
        if (isPrimitive(curr) || curr === aValue) {
          return replaceAt(acc, index, curr);
        }
        if (isArray(curr) && isArray(aValue)) {
          return replaceAt(acc, index, deepMergeArrays(aValue, curr, arrayMergeMethod) as any);
        }
        if (isDefinedObject(curr) && isDefinedObject(aValue)) {
          return replaceAt(acc, index, deepMerge(aValue, curr, arrayMergeMethod) as any);
        }
        return [ ...acc ];
      }, arrayCopy(a) || []);
    case 'value':
      return distinct(concat(a, b));
    case 'concatOnly':
      return concat(a, b);
    default:
      throw new InvalidParameterError('Must provide a valid arrayCopyMethod');
  }
};
