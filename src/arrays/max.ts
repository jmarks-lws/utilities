import { undef } from '../misc/undef';
/**
 * Compares all values in an array returning the highest element. Elements should be naturally comparable by the `>` operator.
 * @param {Array<T>} array Array to compare values from.
 */
export const max = <T>([a, b, ...rest]: T[]): T => (undef(b) ? a : max([(a > b ? a : b), ...rest]));
