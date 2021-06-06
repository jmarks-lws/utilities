/**
 * Returns an array with arrays of the given size.
 *
 * @param array {Array} Array to split
 * @param sliceSize {Integer} Size of every group
 */
export const chunkArray = <T>(array: T[], sliceSize: number): Array<T[]> => ([
  array.slice(0, sliceSize),
  ...(array.length <= sliceSize ? [] : chunkArray(array.slice(sliceSize), sliceSize)),
]);
/** Alias of `chunkArray` */
export const slicesOf = chunkArray;
