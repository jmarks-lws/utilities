/**
 * Takes an array of arrays of a desired type and flattens the data out so that all T are in one array.
 * @param arr
 */
export const flattenOnce = <T>(arr: T[][]): T[] => (
  arr.reduce((acc, curr) => [ ...acc, ...curr ], [])
);
