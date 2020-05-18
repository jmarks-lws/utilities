import { first } from './first';
import { reverse } from './reverse';

/**
 * Returns the last T from an Array<T>
 * @param array - The source array
 */
export const last = <T>(array: Array<T>) => first(reverse(array));
