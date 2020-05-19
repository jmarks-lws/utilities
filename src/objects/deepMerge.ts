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
import { clone } from './clone';

export const deepMerge = <T extends Hash>(
  a: Partial<T>,
  b: Partial<T>,
  arrayMergeMethod: ArrayMergeMethod = 'concatOnly',
): T => {
  const allKeys = distinct([ ...keys(a), ...keys(b) ]);
  const result = reduce(allKeys, (acc, key) => {
    const aValue = a[key];
    const bValue = b[key];
    const val = bValue || aValue;

    // let keyVal: any;
    // if (undef(bValue)) {
    //   keyVal = aValue;
    // }
    // if (isReference(aValue) && isReference(bValue)) {
    //   if (isArray(aValue) && isArray(bValue)) {
    //     keyVal = deepMergeArrays(aValue, bValue, arrayMergeMethod);
    //   } else if (isDefinedObject(aValue) && isDefinedObject(bValue)) {
    //     keyVal = deepMerge(aValue, bValue, arrayMergeMethod);
    //   }
    // }

    return {
      ...acc,
      [key]: isPrimitive(val) // eslint-disable-line no-nested-ternary
        ? val : (
          isArray(aValue) && isArray(bValue) // eslint-disable-line no-nested-ternary
            ? deepMergeArrays(aValue!, bValue!, arrayMergeMethod)
            : (
              bValue !== aValue
                ? deepMerge(aValue!, bValue!, arrayMergeMethod)
                : clone(bValue as Hash)
            )
        ),
    };
  }, {} as T);
  return result;
};
