import {
  pick, Hash, HashOf, addProp, hasKey,
} from './object';
import {
  def, strVal, Optional,
} from './miscellaneous';

interface FilterFn<T> {
  (el: T, i?: number, m?: T[]): boolean;
}
interface ReduceFn<TEelement, TResult> {
  (previousValue: TResult, currentValue: TEelement, currentIndex?: number, array?: TEelement[]): TResult;
}

/**
 * A series of simple functional array utilities
 */
export const head = ([x]: any[]) => x;
export const tail = ([, ...xs]: any[]) => xs;
export const copy = (arr: any[]) => [...arr];
export const length = ([x, ...xs]: any[]): number => (def(x) ? 1 + length(xs) : 0)
export const reverse = ([x, ...xs]: any[]): any[] => (def(x) ? [...reverse(xs), x] : []);
export const chopFirst = ([x, ...xs]: any[], n: number = 1): any => (def(x) && n ? [x, ...chopFirst(xs, n - 1)] : []);
export const chopLast = (xs: any[], n: number = 1): any => reverse(chopFirst(reverse(xs), n));

/**
 * Abstractions of Array dot methods, with some additional typescript annotation.
 */
export const isArray = (x: any): boolean => Array.isArray(x);
export const concat = <T>(a: T[], b: T[]): T[] => a.concat(b);
export const reduce = <TElement, TResult>(
  a: TElement[],
  fn: ReduceFn<TElement, TResult>,
  init: TResult,
) => a.reduce(fn, init);

export const reduceRight = <TElement, TResult>(
  a: TElement[],
  fn: ReduceFn<TElement, TResult>,
  init?: TResult,
) => reverse(a).reduce(fn, init);

export const join = (array: any[], delimiter: string) => array.join(delimiter);
export const includes = (haystack: any[], needle: any): boolean => haystack.includes(needle);

/**
 * Returns an array using the following rules:
 *  - If an array is provided, the return array will be a copy of the input array. (via `slice()`)
 *  - If a null or undefined value is provided, a new empty array will be returned.
 *  - If any other value is provided, the return value will be a new array with the
 *    original provided value as its only element.
 * @param input - The value to transform
 */
export const arrayWrap = (input: any): any[] => {
  if (Array.isArray(input)) {
    return input.slice();
  }
  return (input === null || input === undefined) ? [] : [input];
}

// eslint-disable-next-line no-nested-ternary
export const slice = (array: any[], start?: number, end?: number): any[] => array.slice(start, end);

/**
 * Utility mapping function for functional style programming.
 * @param array - The source array
 * @param mapFn - A function which returns a new value for each element of `array`.
 */
export const map = <T, U>(array: T[], mapFn: ((el: T, i: number) => U)): U[] => array.map(mapFn);
/**
 * Prepares a reusable mapper which can run the same function on different sets of arrays using common arguments.
 *
 * @param mapFn - A function which is ready to return a new value for each element of `array`.
 *               The processing from this function is deferred until the returned function is called.
 *
 * @returns (array: IMappableObject) => T[]
 */
export const preparedMap = <T, U>(mapFn: (<T>(el: T, i: number) => U)) => (ary: T[]): U[] => map(ary, mapFn)

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
 * Returns a new array consisting of elements that exist only in `a` and only in `b`, but not in both `a` and `b`
 * @param a
 * @param b
 */
export const notIntersect = <T>(a: T[], b: T[]) => concat(prune(a, intersect(a, b)), prune(b, intersect(a, b)));

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
export const where = <T>(array: Array<T>, whereFn: FilterFn<T>) => array.filter(whereFn);

export const whereNot = <T>(array: Array<T>, whereFn: FilterFn<T>) => array.filter((x, i, a) => !whereFn(x, i, a));

export const partition = <T>(array: T[], fn: FilterFn<T>) => [where(array, fn), whereNot(array, fn)];

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
export const countWhere = <T>(array: Array<T>, fn: FilterFn<T>) => array.filter(fn).length

/**
 * Returns a sum of a provided field from the elements in an array.
 * @param array - The source array
 * @param field - Which field to sum. If the value of any instance of this property in any element cannot be parsed to an Integer, the result will be NaN
 */
export const sum = <T>(array: T[], field: string) => array.reduce(
  (prev, cur) => prev + parseInt((cur as Hash)[field], 10), 0,
)
/**
 * Returns a sum of a provided field matching a given condition from the elements in an array.
 * @param array - The source array
 * @param fn - Function used to filter the source list.
 * @param field - Which field to sum. If the value of any instance of this property in any element cannot be parsed to an Integer, the result will be NaN
 */
export const sumWhere = <T>(array: Array<T>, fn: FilterFn<T>, field: string) => sum(array.filter(fn), field);

export const min = <T>(array: Array<T>, field: Optional<string> = null) => Math.min(
  ...(field ? (array.map((e: Hash) => e[field])) : array),
)

export const max = <T>(array: Array<T>, field: Optional<string> = null) => Math.max(
  ...(field ? (array.map((e: Hash) => e[field])) : array),
)

/**
 * Asserts that an array has any elements matching a condition
 * @param array - The source array
 * @param fn - Function used to filter the source list.
 */
export const hasAny = <T>(array: Array<T>, fn: FilterFn<T>) => array.filter(fn).length > 0;
/**
 * Asserts that an array does not have any elements matching a condition
 * @param array - The source array
 * @param fn - Function used to filter the source list.
 */
export const hasNone = <T>(array: Array<T>, fn: FilterFn<T>) => !hasAny(array, fn);
/**
 * Asserts that all elements match a given condition
 * @param array - The source array
 * @param fn - Function used to filter the source list.
 */
export const hasAll = <T>(array: T[], fn: FilterFn<T>) => array.filter(fn).length === array.length;

/**
 * Returns a hash from an array of objects where the key is the value of the provided field name.
 * @param array - The source array
 * @param key - Which field to use as the ObjectHash key
 */
export const hash = <T extends any>(array: Array<T>, key: string): HashOf<T> => (
  array.reduce(
    (prev: HashOf<T>, curr: T): HashOf<T> => addProp(prev, strVal(curr[key]), curr) as HashOf<T>,
    {} as HashOf<T>,
  )
)

/**
 * Removes elements which are null or undefined.
 * @param array - The source array
 */
export const compactArray = (array: any[]) => array.filter((el) => ![null, undefined].includes(el))

/**
 * Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
 * @param arr
 * @param d
 */
export const flatten = (arr: any[], d = 1): any[] => (d > 0
  ? arr.reduce((acc, val) => acc.concat(isArray(val) ? flatten(val, d - 1) : val), [])
  : arr.slice()
)

export const arrayEmpty = (array: any[]) => count(array) === 0;
