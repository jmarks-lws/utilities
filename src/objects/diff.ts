import { Hash } from './types/Hash';
import { keys } from './keys';

/**
 * Provides a list of change types where the "from" object is `a` and the "to" object is `b`.
 * '-' indicates a field was removed, '+' indicates a field was added, and '~' indicates that the value of a field has changed.
 * @param a
 * @param b
 */
export const diff = (a: Hash, b: Hash) => {
  const dif: Hash = {};
  const aKeys = keys(a);
  const bKeys = keys(b);
  aKeys.forEach((key) => {
    if (b[key] === undefined) {
      dif[key] = '-';
    } else if (typeof a[key] === 'object' && a[key] !== null) {
      const comparison = diff(a[key], b[key]);
      if (keys(comparison).length > 0) {
        dif[key] = comparison; // diff(a[key], b[key]);
      }
    } else if (typeof a[key] !== typeof b[key] || a[key] !== b[key]) {
      dif[key] = '~';
    }
  });
  bKeys.forEach((key) => {
    if (a[key] === undefined) {
      dif[key] = '+';
    }
  });
  return dif;
};
