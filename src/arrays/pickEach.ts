import { map } from './map';
import { Hash } from '../objects/types/Hash';
import { pick } from '../objects/pick';

/**
 * Returns a new array of objects containing a subset of fields from an original array of objects.
 * @param array - The source array
 * @param fields - A list of property names to keep from each object in `array`. If the array does not contain any of
 *                 the expected elements, they will not exist in the resulting output array
 */
export const pickEach = <T>(
  array: Array<T>,
  fields: string[],
) => map(array, (e: Hash) => pick(e, fields));
