import { HashOf } from './types/HashOf';
import { keys } from './keys';
import { reduce } from '../arrays/reduce';

/**
 * Works similarly to mapping an array, but maps the keys of `o`, returning a new object that has
 * the same values with their keys each transformed by `fn`.
 */
export const transformKeys = <T>(o: HashOf<T>, fn: (key: string) => string) : HashOf<T> => reduce(
  keys(o) as string[],
  (acc: HashOf<T>, key) => ({ ...acc, [fn(key)]: o[key] }),
  {} as HashOf<T>,
);
