import { addProp } from '../objects/addProp';
import { Hash } from '../objects/types/Hash';
import { HashOf } from '../objects/types/HashOf';
import { reduce } from './reduce';
import { strVal } from '../misc/strVal';

/**
 * Returns a hash from an array of objects where the key is the value of the provided field name.
 * @param array - The source array
 * @param key - Which field to use as the ObjectHash key
 */
export const table = <T extends Hash>(
  array: Array<T>,
  key: keyof T,
): HashOf<T> => (
    reduce(
      array as T[],
      (prev, curr) => addProp(prev, strVal(curr[key]), curr) as Hash,
      {} as HashOf<T>,
    )
  );
  /** Alias for `table()` */
export const hash = table;
/** Alias for `table()` */
export const hashTable = table;
/** Alias for `table()` */
export const associative = table;
