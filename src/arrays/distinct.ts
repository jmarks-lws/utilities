import { includes } from './includes';
import { reduce } from './reduce';

/**
 * Helper method: Returns an array consisting only of distinct values.
 * @param array - array to filter
 */
export const distinct = <T>(
  array: Array<T>,
) => reduce(array, (acc, el) => (includes(acc, el) ? [...acc] : [ ...acc, el ]), [] as T[]);
