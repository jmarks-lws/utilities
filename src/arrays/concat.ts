/**
 * Returns an array that is the result of appending each array to the end of the one before it in sequence
 * @param {Array<T>[]} args: Each argument should be an array.
 * */
export const concat = <T>(...args: Array<T>[]): T[] => (([] as T[]).concat(...args));
