import { HashOf } from 'src/object';
import { TCountDictionary } from 'src/miscellaneous';

/**
 * Helper method: creates a dictionary where the key is the value of array item
 * and the values are the number of times it shows up along  as a TCountDictionary<T>
 * @param array - array of type T
 * @returns a hash of TCountDictionary<T>, where value is the the number of times an
 * array item appears along with the item
 * e.g. for array [1,1,2,3] => {'1': {count: 2, value: 1}, '2': {count: 1, value: 2}, '3': {count: 1, value: 3}}
 */
export const duplicateCountDictionary = <T>(
  array: Array<T>,
) => (
  array.reduce((acc: HashOf<TCountDictionary<T>>, value) => (
    {
      ...acc,
      [`${value}`]: {
        count: (acc[`${value}`].count ?? 0) + 1,
        value,
      },
    }
  ), {})
);
