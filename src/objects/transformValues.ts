import { HashOf } from './types/HashOf';
import { keys } from './keys';
import { reduce } from '../arrays/reduce';

/**
 * Works similarly to mapping an array, but maps the values of `o`, returning a new object that has
 * the same keys with values each transformed by `fn`.
 */
export const transformValues = <T, U>(o: HashOf<T>, fn: (value: T) => U) : HashOf<U> => reduce(
  keys(o),
  (acc: HashOf<U>, key) => ({ ...acc, [key]: fn(o[key]) }),
  {} as HashOf<U>,
);
