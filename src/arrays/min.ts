import { undef } from '../misc/undef';

/**
 * Compares all values in an array returning the lowest element. Elements should be naturally comparable by the `<` operator.
 * @param {Array<T>} array Array to compare values from.
 */
export const min = <T>([a, b, ...rest]: T[]): T => (undef(b) ? a : min([(a < b ? a : b), ...rest]));
