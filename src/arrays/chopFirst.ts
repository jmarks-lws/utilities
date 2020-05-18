import { def } from '../misc/def';
import { head } from './head';
import { tail } from './tail';
/**
 * Retreives the first `n` elements from `array` and returns as a new Array.
 */
export const chopFirst = (array: any[], n: number = 1): any => (
  def(head(array)) && n ? [head(array), ...chopFirst(tail(array), n - 1)] : []
);
