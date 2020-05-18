import { concat } from './concat';
import { Hash } from '../objects/types/Hash';
import { HashOf } from '../objects/types/HashOf';
import { hasKey } from '../objects/hasKey';
import { reduce } from './reduce';

/**
 * Group array items by a specific key which should exist on all elements of the array.
 *
 * @param array An ideally flat array of objects
 * @param key The name of the key which should be used as the key for each item group.
 */
export const group = <T extends Hash>(array: Array<T>, key: string) => {
  const grouped = reduce(
    array,
    (prev, curr) => (
      hasKey(prev, `${curr[key]}`)
        ? { ...prev, [`${curr[key]}`]: concat(prev[`${curr[key]}`], [ curr ]) }
        : { ...prev, [`${curr[key]}`]: [ curr ] }
    ),
    {} as HashOf<Hash[]>,
  );
  return grouped;
};
