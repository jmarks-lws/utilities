import { def } from '../misc/def';
import { head } from './head';
import { tail } from './tail';

/**
 * Returns a new array that is the result of reversing the order of the elements in `array`
 */
export const reverse = (
  array: any[],
): any[] => (def(head(array)) ? [...reverse(tail(array)), head(array)] : []);
