import { count } from './count';
import { countWhere } from './countWhere';
import { def } from '../misc/def';
import { map } from './map';

/** Helper method: Determines how many elements in an array are a value other than undefined. */
export const countDefined = (array: Array<any>) => countWhere(map(array, (i) => def(i)), (defined) => defined === true);
/** Helper method: Determines if an array contains exactly one defined value */
export const hasOneDefined = (array: Array<any>) => countDefined(array) === 1;
/** Helper method: Determines if an array contains one or more defined values */
export const hasSomeDefined = (array: Array<any>) => countDefined(array) > 0;
/** Helper method: Determines if an array contains no undefined values */
export const hasAllDefined = (array: Array<any>) => countDefined(array) === count(array);
/** Helper method: Determines if an array contains only undefined values */
export const hasNoneDefined = (array: Array<any>) => countDefined(array) === 0;
