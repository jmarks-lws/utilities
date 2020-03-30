import {
  pick, Hash, HashOf, addProp, hasKey,
} from './object';
import {
  def, strVal, undef, intVal, Nullable,
} from './miscellaneous';

interface FilterFn<T> {
  (el: T, i?: number, m?: T[]): boolean;
}
interface ReduceFn<TEelement, TResult> {
  (previousValue: TResult, currentValue: TEelement, currentIndex?: number, array?: TEelement[]): TResult;
}

export const isArray = (x: any): boolean => Array.isArray(x); // NOTE: This is a static function, so not going to attempt to rewrite.
export const concat = <T, U>(a: T[], b: U[]): (T | U)[] => [...a, ...b]; // TODO: Rewrite

/**
 * A series of simple functional array utilities
 */
export const head = ([x]: any[]) => x;
export const tail = ([, ...xs]: any[]) => xs;
export const arrayCopy = <T>(arr: T[]): Nullable<Array<T>> => (Array.isArray(arr) ? [...arr] : null);

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
export const reverse = (array: any[]): any[] => (def(head(array)) ? [...reverse(tail(array)), head(array)] : []);
export const chopFirst = (array: any[], n: number = 1): any => (
  def(head(array)) && n ? [head(array), ...chopFirst(tail(array), n - 1)] : []
);
export const chopLast = (xs: any[], n: number = 1): any => reverse(chopFirst(reverse(xs), n));

export const dropFirst = <T>(array: T[], n: number = 0): T[] => chopLast(array, count(array) - min([n, count(array)]));
export const dropLast = <T>(array: T[], n: number = 0): T[] => chopFirst(array, count(array) - min([n, count(array)]));

/**
 * Abstractions of Array dot methods, with some additional typescript annotation.
 */
const internalReduce = <TElement, TResult>(
  array: TElement[],
  fn: ReduceFn<TElement, TResult>,
  init: TResult,
  currentIndex: number,
  initialArray: TElement[],
): TResult => (
    count(array) === 0
      ? init
      : internalReduce(tail(array), fn, fn(init, head(array), currentIndex || 0), currentIndex || 0, initialArray)
  )

export const reduce = <TElement, TResult>(
  array: TElement[],
  fn: ReduceFn<TElement, TResult>,
  init: TResult,
): TResult => internalReduce(array, fn, init, 0, array);

export const reduceRight = <TElement, TResult>(
  array: TElement[],
  fn: ReduceFn<TElement, TResult>,
  init?: TResult,
) => reduce(
    reverse(array),
    (a, b, c) => fn(a as TResult, b, c),
    init,
  );

export const join = (
  [x, y, ...rest]: any[],
  delimiter: string,
): string => (y ? strVal(x) + delimiter + join([y, ...rest], delimiter) : x);
export const includes = (
  haystack: any[],
  needle: any,
): boolean => reduce(haystack, (acc: boolean, el) => (acc || el === needle), false);

export const slice = <T>(
  array: T[],
  start: number = 0,
  end: number = Infinity,
): T[] => (
    dropLast(dropFirst(array, start), count(array) - min([ count(array), end ]))
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
 * @param whereFn - Function used to filter the source list.
 */
export const where = <T>(
  array: Array<T>,
  whereFn: FilterFn<T>,
) => reduce(array, (acc: T[], el, i) => (whereFn(el) ? [...acc, el] : [...acc]), []);

export const whereNot = <T>(array: Array<T>, whereFn: FilterFn<T>) => where(array, (x, i, m) => !whereFn(x, i, m));

export const partition = <T>(array: T[], fn: FilterFn<T>) => [where(array, fn), whereNot(array, fn)];

/**
 * Returns the first T from an Array<T>
 * @param array - The source array
 */
export const first = <T>([x]: Array<T>) => x;
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

export const countDefined = (array: Array<any>) => countWhere(map(array, (i) => def(i)), (defined) => defined === true);
export const hasOneDefined = (array: Array<any>) => countDefined(array) === 1;
export const hasSomeDefined = (array: Array<any>) => countDefined(array) > 0;
export const hasAllDefined = (array: Array<any>) => countDefined(array) === count(array);
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
export const hash = <T extends Hash>(array: Array<T>, key: string): HashOf<T> => (
  reduce(
    array as T[],
    (prev: HashOf<T>, curr: T): HashOf<T> => addProp(prev, strVal(curr[key]), curr) as HashOf<T>,
    {} as HashOf<T>,
  )
)

/**
 * Removes elements which are null or undefined.
 * @param array - The source array
 */
export const compactArray = (array: any[]) => where(array, (x) => !includes([undefined, null], x))

/**
 * Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
 * @param arr
 * @param d
 */
export const flatten = (arr: any[], d = 1): any[] => (d > 0
  ? reduce(arr, (acc, val) => acc.concat(isArray(val) ? flatten(val, d - 1) : val), [])
  : slice(arr)
)

export const arrayEmpty = (array: any[]) => count(array) === 0;
