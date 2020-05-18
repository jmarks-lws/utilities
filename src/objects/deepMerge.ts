import { Hash } from './types/Hash';
import { ArrayMergeMethod } from '../arrays/types/ArrayMergeMethod';
import { distinct } from '../arrays/distinct';
import { keys } from './keys';
import { reduce } from '../arrays/reduce';
import { undef } from '../misc/undef';
import { isReference } from '../misc/isReference';
import { isArray } from '../arrays/isArray';
import { deepMergeArrays } from '../arrays/deepMergeArrays';
import { isDefinedObject } from './isDefinedObject';
import { isPrimitive } from '../misc/isPrimitive';

export const deepMerge = <T extends Hash>(
  a: Partial<T>,
  b: Partial<T>,
  arrayMergeMethod: ArrayMergeMethod = 'concatOnly',
): T => {
  const allKeys = distinct([ ...keys(a), ...keys(b) ]);
  const result = reduce(allKeys, (acc, key) => {
    const val = b[key] || a[key];
    const aValue = a[key];
    const bValue = b[key];

    let keyVal: any;
    if (undef(bValue)) {
      keyVal = aValue;
    }
    if (isReference(a) && isReference(b)) {
      if (isArray(a) && isArray(b)) {
        keyVal = deepMergeArrays(a, b, arrayMergeMethod);
      } else if (isDefinedObject(a) && isDefinedObject(b)) {
        keyVal = deepMerge(a, b, arrayMergeMethod);
      }
    }

    return {
      ...acc,
      [key]: isPrimitive(val) // eslint-disable-line no-nested-ternary
        ? val : (
          isArray(a[key]) && isArray(b[key]) // eslint-disable-line no-nested-ternary
            ? deepMergeArrays(a[key]!, b[key]!, arrayMergeMethod)
            : (
              b[key] !== a[key]
                ? deepMerge(a[key]!, b[key]!, arrayMergeMethod)
                : b[key]
            )
        ),
    };
  }, {} as T);
  return result;
};
