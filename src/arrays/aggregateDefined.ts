import { count } from './count';
import { countWhere } from './countWhere';
import { def } from '../misc/def';
import { map } from './map';

/** Helper method: Determines how many elements in an array are a value other than undefined. */
export const countDefined = <T>(array: Array<T>) => (
  countWhere(map(array, (i) => def(i)), (defined) => defined === true)
);
/** Helper method: Determines if an array contains exactly one defined value */
export const hasOneDefined = <T>(array: Array<T>) => countDefined(array) === 1;
/** Helper method: Determines if an array contains one or more defined values */
export const hasSomeDefined = <T>(array: Array<T>) => countDefined(array) > 0;
/** Helper method: Determines if an array contains no undefined values */
export const hasAllDefined = <T>(array: Array<T>) => countDefined(array) === count(array);
/** Helper method: Determines if an array contains only undefined values */
export const hasNoneDefined = <T>(array: Array<T>) => countDefined(array) === 0;
