/**
 * Utility mapping function for functional style programming.
 * @param array - The source array
 * @param mapFn - A function which returns a new value for each element of `array`.
 */
export const map = <T, U>(
  array: T[],
  mapFn: ((el: T, i: number, array: T[]) => U),
): U[] => array.map(mapFn);
