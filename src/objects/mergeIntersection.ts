import { getSharedKeys } from './getSharedKeys';
import { pick } from './pick';
import { Hash } from './types/Hash';
import { merge } from './merge';

/**
 * Returns a new object that is the result of merging together two objects ONLY on keys that both share.
 * If `a` and `b` have differing values for a property, the resulting object will receive its value from object `b`.
 * This is a shallow and fast merge. More complex needs may need to be managed differently.
 * @param a
 * @param b
 */
export const mergeIntersection = (a: Hash, b: Hash): Hash => {
  const [a2, b2] = [a, b].map((o: Hash) => pick(o, getSharedKeys(a, b) as string[]));
  return merge(a2, b2);
};
