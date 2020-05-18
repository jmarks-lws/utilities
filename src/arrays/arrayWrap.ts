import { arrayCopy } from './arrayCopy';

/**
 * Returns an array using the following rules:
 *  - If an array is provided, the return array will be a copy of the input array
 *  - If a null or undefined value is provided, a new empty array will be returned.
 *  - If any other value is provided, the return value will be a new array with the
 *    original provided value as its only element.
 * @param input - The value to transform
 */
export const arrayWrap = (input: any): any[] => (
  arrayCopy(input) ?? ((input === null || input === undefined) ? [] : [input])
);
