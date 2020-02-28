import {
  pick, Hash,
} from './object';
import { IMappableObject } from './functional';

const int = (value: string) => parseInt(value, 10);

/**
 * Utility mapping function for functional style programming.
 * @param array - The source array
 * @param mapFn - A function which returns a new value for each element of `array`.
 */
export const map = (array: IMappableObject, mapFn: ((el: any, i: number) => any)) => array.map(mapFn);
/**
 * Prepares a reusable mapper which can run the same function on different sets of arrays using common arguments.
 *
 * @param mapFn - A function which is ready to return a new value for each element of `array`.
 *               The processing from this function is deferred until the returned function is called.
 *
 * @returns (array: IMappableObject) => T[]
 */
export const preparedMap = <T>(mapFn: (<T>(el: any, i: number) => T)) => (ary: IMappableObject): T[] => map(ary, mapFn)

/**
 * Returns a new array which is the result of removing elements from `initialList` which are also in `pruneList`
 * @param initialList - List to prune from. The source list is not affected. A new array will be returned.
 * @param pruneList - List of elements to remove.
 */
export const prune = <T>(initialList: T[], pruneList: T[]) => initialList.filter((el: T) => !pruneList.includes(el));

/**
 * Returns a new array consisting of elements that exist in both `a` and `b`
 * @param a
 * @param b
 */
export const intersect = <T>(a: T[], b: T[]) => a.filter((el: T) => b.includes(el));

/**
 * Returns a new array that is the result of removing `element` from `array`
 * @param array - The source array
 * @param element - The element to omit from the resulting array.
 */
export const omit = <T>(array: Array<T>, element: T) => array.filter((e) => e !== element);

/**
 * Returns a new array that is the result of inserting `element` to `array` at position `index`
 * @param array - The source array
 * @param element - The element to add to the resulting array
 * @param index - Where to place the element
 */
export const insertAt = <T>(array: Array<T>, element: T, index: number) => [
  ...array.slice(0, index), element, ...array.slice(index),
];

/**
 * Returns a new array that is the result of removing the element at position `index` from `array`
 * @param array - The source array
 * @param index - The index of the element to remove
 */
export const removeAt = <T>(array: Array<T>, index: number) => [
  ...array.slice(0, index), ...array.slice(index + 1),
];

/**
 * Returns a new array of objects containing a subset of fields from an original array of objects.
 * @param array - The source array
 * @param fields - A list of property names to keep from each object in the array. If the array does not contain any of the expected elements, they will not exist in the resulting output array.
 */
export const pickEach = <T>(array: Array<T>, fields: string[]) => map(array, (e: Hash) => pick(e, fields));
/**
 * Returns a new array of objects containing filtered from an original array of objects. Bare wrapper around `array.filter()` for functional
 * @param array - The source array
 * @param whereFn - Function used to filter the source list.
 */
export const where = <T>(array: Array<T>, whereFn: ((testElement: T) => boolean)) => array.filter(whereFn);

/**
 * Returns the first T from an Array<T>
 * @param array - The source array
 */
export const first = <T>(array: Array<T>) => array[0];
/**
 * Returns the first T that matches a provided condition from an Array<T>
 * @param array - The source array
 * @param whereFn - Function used to filter the source list.
 */
export const findFirst = <T>(array: Array<T>, whereFn: ((testElement: T) => boolean)) => first(where(array, whereFn))

/**
 * Returns the last T from an Array<T>
 * @param array - The source array
 */
export const last = <T>(array: Array<T>) => array[array.length - 1];
/**
 * Returns the last T that matches a provided condition from an Array<T>
 * @param array - The source array
 * @param whereFn - Function used to filter the source list.
 */
export const findLast = <T>(array: Array<T>, whereFn: ((testElement: T) => boolean)) => last(where(array, whereFn))

/**
 * Returns number of elements in an array. Bare wrapper around `array.length` for functional
 * @param array - The source array
 */
export const count = <T>(array: Array<T>) => array.length;
/**
 * Returns number of elements in an array matching a given condition.
 * @param array - The source array
 * @param fn - Function used to filter the source list.
 */
export const countWhere = <T>(array: Array<T>, fn: ((el: T) => boolean)) => array.filter(fn).length

/**
 * Returns a sum of a provided field from the elements in an array.
 * @param array - The source array
 * @param field - Which field to sum. If the value of any instance of this property in any element cannot be parsed to an Integer, the result will be NaN
 */
export const sum = <T>(array: T[], field: string) => array.reduce((prev, cur) => prev + int((cur as Hash)[field]), 0)
/**
 * Returns a sum of a provided field matching a given condition from the elements in an array.
 * @param array - The source array
 * @param fn - Function used to filter the source list.
 * @param field - Which field to sum. If the value of any instance of this property in any element cannot be parsed to an Integer, the result will be NaN
 */
export const sumWhere = <T>(array: Array<T>, fn: ((el: T) => boolean), field: string) => sum(array.filter(fn), field);

/**
 * Asserts that an array has any elements matching a condition
 * @param array - The source array
 * @param fn - Function used to filter the source list.
 */
export const hasAny = <T>(array: Array<T>, fn: ((el: T) => boolean)) => array.filter(fn).length > 0;
/**
 * Asserts that an array does not have any elements matching a condition
 * @param array - The source array
 * @param fn - Function used to filter the source list.
 */
export const hasNone = <T>(array: Array<T>, fn: ((el: T) => boolean)) => !hasAny(array, fn);
/**
 * Asserts that all elements match a given condition
 * @param array - The source array
 * @param fn - Function used to filter the source list.
 */
export const hasAll = <T>(array: T[], fn: ((el: T) => boolean)) => array.filter(fn).length === array.length;

/**
 * Returns a hash from an array of objects where the key is the value of the provided field name.
 * @param array - The source array
 * @param key - Which field to use as the ObjectHash key
 */
export const hash = <T>(array: Array<T>, key: string) : Hash => (
  array.reduce((prev, curr: Hash) => ({ ...prev, [curr[key] as string]: curr }), {})
)

/**
 * Removes elements which are null or undefined.
 * @param array - The source array
 */
export const compactArray = (array: any[]) => array.filter((el) => ![null, undefined].includes(el))
