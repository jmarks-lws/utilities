import { Optional } from 'src/misc/types/Optional';
import { where } from './where';

/**
 * Removes elements which are null or undefined.
 * @param array - The source array
 */
export const compactArray = <T>(array: Array<Optional<T>>, allowNulls = false): T[] => (
  where(array, (x) => x !== undefined && (allowNulls || x !== null)) as T[]
);
