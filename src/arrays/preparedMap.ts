import { map } from './map';

/**
 * Prepares a reusable mapper which can run the same function on different sets of arrays using common arguments.
 *
 * @param mapFn - A function which is ready to return a new value for each element of `array`.
 *               The processing from this function is deferred until the returned function is called.
 *
 * @returns (array: IMappableObject) => T[]
 */
export const preparedMap = <T, U>(
  mapFn: (<T>(el: T, i: number) => U),
) => (ary: T[]): U[] => map(ary, mapFn);
