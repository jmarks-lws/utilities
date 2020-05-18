/**
 * Zips two arrays into an array of tuples. Assumes both arrays are the length of `keysArray`
 * @param keysArray
 * @param valuesArray
 */
export const zip = <T>(
  keysArray: string[],
  valuesArray: T[],
): Array<[string, T]> => keysArray.reduce(
    (acc: [string, T][], key: string, i) => acc.concat([key, valuesArray[i]]), [] as [string, T][],
  );
