/**
 * Retreives the first `n` elements from `array` and returns as a new Array.
 */
export const chopFirst = <T>(list: T[], n: number = 1): T[] => {
  const [ first, ...rest ] = list;
  return n > 1 ? chopFirst(rest, n - 1) : rest;
};
