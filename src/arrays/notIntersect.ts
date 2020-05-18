import { concat } from './concat';
import { intersect } from './intersect';
import { prune } from './prune';

/**
 * Returns a new array consisting of elements that exist only in `a` and only in `b`, but not in both `a` and `b`
 * @param a
 * @param b
 */
export const notIntersect = <T>(a: T[], b: T[]) => (
  concat(prune(a, intersect(a, b)), prune(b, intersect(a, b)))
);
