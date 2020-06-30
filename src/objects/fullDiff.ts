import { Hash } from './types/Hash';
import { keys } from './keys';
import { diff } from './diff';

/**
 * Provides a list of change descriptions where the "from" object is `a` and the "to" object is `b`.
 * '-' indicates a field was removed, '+' indicates a field was added
 * @param a
 * @param b
 */
export const fullDiff = (a: Hash, b: Hash) => {
  const dif: Hash = {};
  const aKeys = keys(a);
  const bKeys = keys(b);
  aKeys.forEach((key) => {
    if (!bKeys.includes(key)) {
      dif[key] = { '-': a[key] };
    } else if (typeof a[key] === 'object') {
      const comparison = diff(a[key], b[key]);
      if (keys(comparison).length > 0) {
        dif[key] = fullDiff(a[key], b[key]);
      }
    } else if (typeof a[key] !== typeof b[key] || a[key] !== b[key]) {
      dif[key] = { '-': a[key], '+': b[key] };
    }
  });
  bKeys.forEach((key) => {
    if (!aKeys.includes(key)) {
      dif[key] = { '+': b[key] };
    }
  });
  return dif;
};
