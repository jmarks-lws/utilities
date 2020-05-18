import { includes } from './includes';
import { where } from './where';

/**
 * Returns a new array consisting of elements that exist in both `a` and `b`
 * @param a
 * @param b
 */
export const intersect = <T>(a: T[], b: T[]) => where(a, (el: T) => includes(b, el));
