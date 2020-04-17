import {
  pick, Hash, HashOf, addProp, hasKey, objectsHaveSameValues,
} from './object';
import {
  def, strVal, undef, intVal, Nullable,
} from './miscellaneous';
import { identity } from './functional';

/**
 * Function signature used in `filter()` and other filtering functions.
 */
interface FilterFn<T> {
  (el: T, i?: number, m?: T[]): boolean;
}
/**
 * Function signature used in `reduce()` and `reduceRight()`
 */
interface ReduceFn<TElement, TResult> {
  (previousValue: TResult, currentValue: TElement, currentIndex?: number, array?: TElement[]): TResult;
}

/** Wrapper for native `Array.isArray()` */
export const isArray = (x: any): boolean => Array.isArray(x); // NOTE: This is a static function, so not going to attempt to rewrite.

/**
 * A set of simple functional array utilities
 */
/** Returns the first element of an array */
export const head = ([x]: any[]) => x;
/** Returns all elements other than the first element of an array */
export const tail = ([, ...xs]: any[]) => xs;
/** Shallow copy of an array. References remain intact. If a non-array is supplied, null is returned. */
export const arrayCopy = <T>(arr: T[]): Nullable<Array<T>> => (Array.isArray(arr) ? [...arr] : null);
/**
 * Returns an array that is the result of appending each array to the end of the one before it in sequence
 * @param {Array<T>[]} args: Each argument should be an array.
 * */
export const concat = <T>(...args: Array<T>[]): T[] => (([] as T[]).concat(...args));

/**
 * Compares all values in an array returning the lowest element. Elements should be naturally comparable by the `<` operator.
 * @param {Array<T>} array Array to compare values from.
 */
export const min = <T>([a, b, ...rest]: T[]): T => (undef(b) ? a : min([(a < b ? a : b), ...rest]))
/**
 * Compares all values in an array returning the highest element. Elements should be naturally comparable by the `>` operator.
 * @param {Array<T>} array Array to compare values from.
 */
export const max = <T>([a, b, ...rest]: T[]): T => (undef(b) ? a : max([(a > b ? a : b), ...rest]))

/**
 * Returns number of elements in `array`.
 * @param array - The source array
 */
export const count = (array: any[]): number => (
  // eslint-disable-next-line no-nested-ternary
  !isArray(array)
    ? count([array])
    : (
      array.filter((x) => def(x)).length > 0
        ? 1 + count(tail(array))
        : 0
    )
);
/**
 * Returns a new array that is the result of reversing the order of the elements in `array`
 */
export const reverse = (array: any[]): any[] => (def(head(array)) ? [...reverse(tail(array)), head(array)] : []);
/**
 * Retreives the first `n` elements from `array` and returns as a new Array.
 */
export const chopFirst = (array: any[], n: number = 1): any => (
  def(head(array)) && n ? [head(array), ...chopFirst(tail(array), n - 1)] : []
);
/**
 * Retreives the last `n` elements from `array` and returns as a new Array.
 */
export const chopLast = (xs: any[], n: number = 1): any => reverse(chopFirst(reverse(xs), n));
/**
 * Returns a new Array consisting of the elements of `array` that would remain after dropping the first `n` elements.
 */
export const dropFirst = <T>(array: T[], n: number = 0): T[] => chopLast(array, count(array) - min([n, count(array)]));
/**
 * Returns a new Array consisting of the elements of `array` that would remain after dropping the last `n` elements.
 */
export const dropLast = <T>(array: T[], n: number = 0): T[] => chopFirst(array, count(array) - min([n, count(array)]));

/**
 * Abstractions of Array dot methods, with some additional typescript annotation.
 */

/**
 * Step over each element in `array`, building a new output object which is initialized as `init`.
 * `fn` should return a new representation of the aggregate object after applying changes based
 * on an array element.
 *
 * @param array - An array to step over for source information
 * @param fn - A function to process each element in the array. It should return a new object that is the result of adding changes based on an array element.
 * @param init - The initial value for the object being built by `fn`. Represents the initial state of the object.
 */
export const reduce = <TElement, TResult>(
  array: TElement[],
  fn: ReduceFn<TElement, TResult>,
  init: TResult,
): TResult => array.reduce(fn, init);
/**
 * Similar to `reduce()` but array elements are processed from last to first. (See `reduce()`)
 */
export const reduceRight = <TElement, TResult>(
  array: TElement[],
  fn: ReduceFn<TElement, TResult>,
  init: TResult,
) => array.reduceRight(fn, init);

/**
 * Create a string which is the result of concatenating the string values of each `array` element, using `delimiter` as a separator.
 * @param array
 * @param delimiter
 */
export const join = (
  array: any[],
  delimiter: string = ',',
): string => array.join(delimiter);

/**
 * Determines whether an array includes a certain element, returning true or false as appropriate.
 * Wrapper around `<array>.includes()`.
 * @param array - The array to search through.
 * @param needle - The element to search for
 * @param fromIndex - The position in this array at which to begin searching for searchElement
 */
export const includes = <T>(
  array: T[],
  needle: T,
  fromIndex: number = 0,
): boolean => array.includes(needle, fromIndex);

/**
 * Returns a section of an array.
 * @param array - The array to source the section from.
 * @param start — The beginning of the specified portion of the array.
 * @param end — The end of the specified portion of the array. This is exclusive of the element at the index 'end'.
 */
export const slice = <T>(
  array: T[],
  start: number = 0,
  end: number = Infinity,
): T[] => (
    array.slice(start, end)
  )

/**
 * Returns an array using the following rules:
 *  - If an array is provided, the return array will be a copy of the input array
 *  - If a null or undefined value is provided, a new empty array will be returned.
 *  - If any other value is provided, the return value will be a new array with the
 *    original provided value as its only element.
 * @param input - The value to transform
 */
export const arrayWrap = (input: any): any[] => (
  arrayCopy(input) ?? ((input === null || input === undefined) ? [] : [input])
);

/**
 * Utility mapping function for functional style programming.
 * @param array - The source array
 * @param mapFn - A function which returns a new value for each element of `array`.
 */
export const map = <T, U>(
  array: T[],
  mapFn: ((el: T, i: number) => U),
): U[] => reduce(array, (acc: U[], el, i) => concat(arrayCopy(acc) as any[], [ mapFn(el, intVal(i)) ]), []);
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
 * Returns a new array of objects containing a subset of fields from an original array of objects.
 * @param array - The source array
 * @param fields - A list of property names to keep from each object in `array`. If the array does not contain any of
 *                 the expected elements, they will not exist in the resulting output array
 */
export const pickEach = <T>(array: Array<T>, fields: string[]) => map(array, (e: Hash) => pick(e, fields));
/**
 * Returns a new array of objects containing filtered from an original array of objects.
 * @param array - The source array
 * @param filterFn - Function used to filter the source list.
 */
export const filter = <T>(
  array: Array<T>,
  filterFn: FilterFn<T>,
) => array.filter(filterFn);

/**
 * Alias for `filter()`
 */
export const where = filter;
export const whereNot = <T>(array: Array<T>, whereFn: FilterFn<T>) => where(array, (x, i, m) => !whereFn(x, i, m));

/**
 * Returns a two element array. The first element is an array of items that match the provided query function, the second
 * is the items from the original array that do not match the function query.
 * @param array - The source array to query against.
 * @param filterFn - A lambda that describes elements to match.
 */
export const partition = <T>(array: T[], filterFn: FilterFn<T>) => [where(array, filterFn), whereNot(array, filterFn)];

/**
 * Returns the first T from an Array<T>
 * @param array - The source array
 */
export const first = <T>([x]: Array<T>) : T | undefined => x;
/**
 * Returns the first T that matches a provided condition from an Array<T>
 * @param array - The source array
 * @param whereFn - Function used to filter the source list.
 */
export const findFirst = <T>(array: Array<T>, whereFn: ((testElement: T) => boolean)) => first(where(array, whereFn));
/**
 * Returns the index of the first element in the array where predicate is true, and -1 otherwise.
 * @param array - Array to search.
 * @param filterFn — find calls predicate once for each element of the array, in ascending order, until it finds
 *    one where predicate returns true. If such an element is found, findIndex immediately returns that element index.
 *    Otherwise, findIndex returns -1.
 */
export const findIndex = <T>(array: T[], filterFn: FilterFn<T>) => array.findIndex(filterFn);

/**
 * Returns the last T from an Array<T>
 * @param array - The source array
 */
export const last = <T>(array: Array<T>) => first(reverse(array));
/**
 * Returns the last T that matches a provided condition from an Array<T>
 * @param array - The source array
 * @param whereFn - Function used to filter the source list.
 */
export const findLast = <T>(array: Array<T>, whereFn: ((testElement: T) => boolean)) => last(where(array, whereFn))

/**
 * Returns number of elements in `array` matching a given condition.
 * @param array - The source array
 * @param fn - Function used to filter the source list.
 */
export const countWhere = <T>(array: Array<T>, fn: FilterFn<T>) => where(array, fn).length

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

/**
 * Returns a sum of a provided field from the elements in `array`.
 * @param array - The source array
 * @param field - Which field to sum. If the value of any instance of this property in any element cannot be parsed to an Integer, the result will be NaN
 */
export const sum = <T>(array: T[], field: string) => reduce(array,
  (prev, cur) => prev + parseInt((cur as Hash)[field], 10), 0)
/**
 * Returns a sum of a provided field matching a given condition from the elements in `array`.
 * @param array - The source array
 * @param fn - Function used to filter the source list.
 * @param field - Which field to sum. If the value of any instance of this property in any element cannot be parsed to an Integer, the result will be NaN
 */
export const sumWhere = <T>(array: Array<T>, fn: FilterFn<T>, field: string) => sum(where(array, fn), field);

/**
 * Helper method: Returns an array consisting only of distinct values.
 * @param array - array to filter
 */
export const distinct = <T>(
  array: Array<T>,
) => reduce(array, (acc, el) => (includes(acc, el) ? [...acc] : [ ...acc, el ]), [] as T[]);

/**
 * Asserts that an array has any elements matching a condition
 * @param array - The source array
 * @param fn - Function used to filter the source list.
 */
export const hasAny = <T>(array: Array<T>, fn: FilterFn<T>) => where(array, fn).length > 0;
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
export const hasAll = <T>(array: T[], fn: FilterFn<T>) => count(where(array, fn)) === count(array);

/**
 * Helper method: Returns an array consisting only of distinct values.
 * @param array - array to filter
 */
export const distinctObjects = <T extends Hash>(
  array: Array<T>,
) => reduce(array, (acc, el) => {
    const alreadyProcessed = hasAny(acc, (curr) => objectsHaveSameValues(curr, el));
    return alreadyProcessed ? [ ...acc ] : [ ...acc, el ];
  }, [] as T[]);

/**
 * Returns a new array which is the result of removing elements from `initialList` which are also in `pruneList`
 * @param initialList - List to prune from. The source list is not affected. A new array will be returned.
 * @param pruneList - List of elements to remove.
 */
export const prune = <T>(initialList: T[], pruneList: T[]) => where(initialList, (el: T) => !includes(pruneList, el));

/**
 * Returns a new array consisting of elements that exist in both `a` and `b`
 * @param a
 * @param b
 */
export const intersect = <T>(a: T[], b: T[]) => where(a, (el: T) => includes(b, el));

/**
 * Returns a new array consisting of elements that exist only in `a` and only in `b`, but not in both `a` and `b`
 * @param a
 * @param b
 */
export const notIntersect = <T>(a: T[], b: T[]) => concat(prune(a, intersect(a, b)), prune(b, intersect(a, b)));

/**
 * Returns a new array that is the result of removing `element` from `array`
 * @param array - The source array
 * @param element - The element to omit from the resulting array
 */
export const omit = <T>(array: Array<T>, element: T) => where(array, (e) => e !== element);

/**
 * Returns a new array that is the result of inserting `element` to `array` at position `index`
 * @param array - The source array
 * @param element - The element to add to the resulting array
 * @param index - Where to place the element
 */
export const insertAt = <T>(array: Array<T>, element: T, index: number) => [
  ...slice(array, 0, index), element, ...slice(array, index),
];

/**
 * Returns a new array that is the result of removing the element at position `index` from `array`
 * @param array - The source array
 * @param index - The index of the element to remove
 */
export const removeAt = <T>(array: Array<T>, index: number) => [
  ...slice(array, 0, index), ...slice(array, index + 1),
];

/**
 * Returns a hash from an array of objects where the key is the value of the provided field name.
 * @param array - The source array
 * @param key - Which field to use as the ObjectHash key
 */
export const table = <TInitial extends Hash, TReturn>(
  array: Array<TInitial>,
  key: string,
  transformFn: ((el: TInitial) => TReturn | TInitial) = identity,
): HashOf<TReturn> => (
    reduce(
      array as TInitial[],
      (prev, curr) => addProp(prev, strVal(curr[key]), transformFn(curr)),
      {} as HashOf<TReturn>,
    )
  )
/** Alias for `table()` */
export const hash = table;
/** Alias for `table()` */
export const hashTable = table;
/** Alias for `table()` */
export const associative = table;

/**
 * Group array items by a specific key which should exist on all elements of the array.
 *
 * @param array An ideally flat array of objects
 * @param key The name of the key which should be used as the key for each item group.
 */
export const group = <T extends Hash>(array: Array<T>, key: string) => {
  const grouped = reduce(
    array,
    (prev, curr) => (
      hasKey(prev, `${curr[key]}`)
        ? { ...prev, [`${curr[key]}`]: concat(prev[`${curr[key]}`], [ curr ]) }
        : { ...prev, [`${curr[key]}`]: [ curr ] }
    ),
    {} as HashOf<Hash[]>,
  )
  return grouped;
}

/**
 * Removes elements which are null or undefined.
 * @param array - The source array
 */
export const compactArray = (array: any[], allowNulls = false) => (
  where(array, (x) => x !== undefined && (allowNulls || x !== null))
);

/**
 * Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
 * @param arr
 * @param d
 */
export const flatten = (arr: any[], d = 1): any[] => (d > 0
  ? reduce(arr, (acc, val) => acc.concat(isArray(val) ? flatten(val, d - 1) : val), [])
  : slice(arr)
)

/**
 * Tests `array` to determine if it has a zero length.
 * @param array - array to test
 */
export const arrayEmpty = (array: any[]) => count(array) === 0;

/**
 * Creates an array consisting of a series of sequential numbers.
 * @param n - How many elements to generate
 * @param startAt - Which number to start at. (default 0)
 */
export const series = (n: number, startAt: number = 0) => Array.from(Array(n).keys(), (k) => k + startAt);
