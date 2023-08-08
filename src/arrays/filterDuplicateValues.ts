import { HashOf } from 'src/object';
import { TCountDictionary } from 'src/miscellaneous';
import { duplicateCountDictionary } from './duplicateCountDictionary';

/**
 * Helper method: gives an array back with only the unique values
 * @param array - array with duplicate values
 * @returns an array of unique items e.g. for array [1,1,2,3,2,4] => [3,4]
 */
export const filterDuplicateValues = <T>(
  array: Array<T>,
) => {
    const dictionary = duplicateCountDictionary(array);
    return (
      Object.keys(dictionary)
        .filter((item) => dictionary[item].count === 1)
        .map((item) => dictionary[item].value)
    )
}
