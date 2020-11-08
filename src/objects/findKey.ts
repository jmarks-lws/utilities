import { findIndex } from '../arrays/findIndex';
import { FilterFn } from '../arrays/types/FilterFn';
import { HashOf } from './types/HashOf';

/**
 * Similar to findIndex for arrays. Searches for the first value meeting the condition determined by the `condition`
 * function parameter and returns the corresponding key.
 *
 * @param object
 * @param condition
 */
export const findKey = <T>(object: HashOf<T>, condition: FilterFn<T>) => {
  const _keys = Object.keys(object);
  const values = Object.values(object);
  return _keys[findIndex(values, condition)];
};
