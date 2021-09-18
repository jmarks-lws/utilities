import { count } from './count';

/**
 * Tests `array` to determine if it has a zero length.
 * @param array - array to test
 */
export const arrayEmpty = <T>(array: T[]) => count(array) === 0;
