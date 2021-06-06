import { slice } from './slice';
import { arrayWrap } from './arrayWrap';
/**
 * Retreives the first `n` elements from `array` and returns as a new Array.
 */
export const chopFirst = <T>(list: T[]): T[] => {
  const [ first, ...rest ] = list;
  return rest;
};
