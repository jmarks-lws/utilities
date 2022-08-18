import { hasKey, HashOf, isDefinedObject, keys } from './object';
import { reverse, head, tail, isArray } from './array';
import { undef, def, Nullable } from './miscellaneous';
import { reduce } from './arrays/reduce';

/**
 * Interface used to identify a mappable object. According to most sources, this qualifies as
 * a "functor", but want to verify.
 */
export interface IMappableObject {
  map: <T extends unknown, U extends unknown>(fn: (value: T, index: number, array: T[]) => U, thisArg?: unknown) => U[]
}

/**
 * Determines if the provided object or the key of the provided object is a function.
 * If only `x` is provided, then it will be the target. If both `x` and `key` are provided, `x[key]` is the target.
 * @param x
 * @param key
 */
export const isFunction = (x: unknown): x is Function => (typeof x === 'function');

// TODO: evaluate `either()`, `maybe()` etc
// export function either<T1 extends undefined, T2>(a: T1, b: T2): T2;
// export function either<T1 extends any, T2>(a: T1, b: T2): T1;
// export function either <T1 extends any, T2>(a: T1, b: T2): T1 | T2 {
//   return (a || b);
// }
// export const maybe = <T>(a: T): T | null => either(a, null);

type CurryFirst<T> = T extends (x: infer U, ...rest: any[]) => any ? U : never;
type CurryRest<T> =
    T extends (x: infer U) => infer V ? U :
    T extends (x: infer U, ...rest: infer V) => infer W ? Curried<(...args: V) => W> :
    never;

type Curried<T extends (...args: any[]) => any> = (x: CurryFirst<T>) => CurryRest<T>;

/**
 * Returns a curried version of the provided function.
 * (Note: This will probably mess with your IDE's ability to provide intellisense)
 *
 * [Borrowed from Mostly Adequate Guide](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/content/appendix_a.html#curry)
 *
 * Signature: curry :: ((a, b, ...) => c) => a => b => ... => c
 * @param fn - Function to curry
 */
export const curry = <T extends (...args: any[]) => any>(fn: T): (...args: any[]) => Curried<T> => {
  const arity = fn.length;

  return function $curry(...args: any[]): Curried<T> {
    if (args.length < arity) {
      return $curry.bind(null, ...args) as CurryRest<T>;
    }

    return fn.call(null, ...args) as ReturnType<T>;
  };
};

/**
 * Like `map()`, but awaitable. This way you can ensure mapped async functions have resolved, if desired.
 * @param list
 * @param fn
 */
export const mapAsync = async <T, U>(
  list: T[],
  fn: (value: T, index: number, array: T[]) => Promise<U>,
): Promise<U[]> => Promise.all(list.map(fn));

/**
 * Provides reduce()-like wrapper functionality for times when the reducer would use `await`. By nature,
 * waits for each step to complete sequentially before moving on to the next, in opposition to standard
 * asynchronous patterns.
 *
 * Useful when you need to throttle third party service requests.
 *
 * @param list
 * @param fn
 * @param init
 */
export const reduceAsyncSequential = async<TElement, TResult>(
  list: TElement[],
  fn: (previousValue: TResult, currentValue: TElement, currentIndex: number, array: TElement[]) => Promise<TResult>,
  init: TResult,
) => list.reduce(async (acc, el, index) => fn(await acc, el, index, list), Promise.resolve(init));
/** Alias for `reduceAsyncSequential` */
export const reduceAsync = reduceAsyncSequential;

/**
 * Provides map()-like wrapper functionality for times when the map operation would use `await`. Waits
 * for each step to complete sequentially before moving on to the next, in opposition to standard
 * asynchronous patterns.
 *
 * Useful when you need to throttle third party service requests.
 *
 * @param list
 * @param fn
 * @param init
 */
export const mapAsyncSequential = async <T, U>(
  list: T[],
  fn: ((value: T, index: number, array: T[]) => Promise<U>),
) => reduceAsyncSequential(list, async (prev, curr, i, l) => [ ...prev, await fn(curr, i, l) ], [] as U[]);

/**
 * (Don't use this - deprecation incoming quickly) Provides an English-esque interface for getting a key from an object with a default value.
 * @param key
 * @param defaultValue
 * @deprecated Hindsight being what it is, this isn't the best. Doesn't really match the rest of the methodology throughout this project.
 */
export const take = <T>(key: string, defaultValue?: T) => ({
  from: (object: HashOf<T>) => (hasKey(object, key) ? object[key] : defaultValue),
});

/**
 * Returns the value given. Intended for used in some branching expressions as a means of ensuring
 * we always return a function value to reduce complexity otherwise introduced with null checking, etc.
 * @param id
 */
export const identity = <T>(id: T): T => id;

/**
 * Partially apply a function by filling in any number of its arguments.
 * Note: We will often lose some of typescript's intellisense when using `partial()`
 * @param fn The function to partially apply
 * @param args Some arguments. Does not have to be all of the arguments needed for the base function.
 */
export const partial = (fn: CallableFunction, ...args: any[]) => (...newArgs: any[]) => fn(...args, ...newArgs);

/**
 * Wraps a function that normally accepts a single array as an argument so that elements can be provided as individual parameters
 * @param fn The function to wrap
 */
export const spreadArgs = <T>(fn: (arg: T[]) => T) => (...args: T[]) => fn(args);

/**
 * Wraps a function that normally accepts multiple parameters such that the elements can be provided as an array.
 * @param fn The function to wrap.
 */
export const argsAsArray = <T>(fn: (...args: T[]) => T) => (arg: T[]) => fn(...arg);

/**
 * Reverses the order of arguments in a function call. Helpful for many 'functional programming' tasks.
 * @param fn The function to reverse arguments for.
 */
export const reverseArgs = (fn: CallableFunction) => (...args: any[]) => fn(...reverse(args));

/**
 * Functional style conditional
 * @param condition An expression representing the query
 * @param truePath A function to apply when `condition` resolves to true
 * @param falsePath A function to apply when `condition` resolves to false
 */
export const branch = <T>(
  condition: boolean,
  truePath: ((x: T) => any),
  falsePath?: ((x: T) => any),
) => (x: T) => (
  // eslint-disable-next-line no-nested-ternary
    condition ? truePath(x) : (falsePath ? falsePath(x) : identity(x))
  );

/**
 * Functional style try catch expression
 * @param tryPath A function which contains the initial code that will be attempted
 * @param catchPath A function which handles errors if they occur in `tryPath`
 * @param finallyPath A function that is run after try or finally.
 */
export const tryCatch = async <TContext, U = unknown, V = U>(
  context: TContext,
  tryPath: ((x: TContext) => U | Promise<U>),
  catchPath: ((x: TContext, error?: unknown) => U | Promise<U>),
  finallyPath: ((x: TContext, results: ({ tryResult: Nullable<U>, catchResult: Nullable<U> })) => V | Promise<V>),
) => {
  let tryResult: Nullable<U> = null;
  let catchResult: Nullable<U> = null;
  let finallyResult: V;
  try {
    tryResult = await tryPath(context);
  } catch (error) {
    catchResult = await catchPath(context, error);
  } finally {
    finallyResult = await finallyPath(context, { tryResult, catchResult });
  }
  return finallyResult;
};

/**
 * Wrap a function so that it will only run at most `times` times when called from the resulting wrapper.
 *
 * Note:
 *   Contrary to this library's overall design philosophy, by its nature, `maxTimes()` often results in a
 *   function which causes side effects.
 *
 * Warning:
 *   Use cautiously. Calling the resulting function more than the allotted number of times will return `null`.
 *
 * @param times - Number of times to allow this function to run
 * @param fn - Function to wrap
 * @param context - An optional context to provide `this` for the enclosed function.
 */
export const maxTimes = <T extends (...args: any[]) => any>(times: number, fn: T, context?: any) => {
  let ranTimes: number = 0;

  return function someFunction(this: any, ...args: any[]) {
    if (ranTimes >= times) return null;
    ranTimes += 1;
    return fn.apply(context || this, args);
  } as T;
};

/**
 * Convenience method providing a wrapper that can only run an enclosed function once. Delegates to `maxTimes`
 * Warning:
 *   Use cautiously. Calling the resulting function more than one time will return `null`.
 * @param fn - Function to wrap
 * @param context - An optional context to provide `this` for the enclosed function.
 */
export const maxOnce = <T extends (...args: any[]) => any>(fn: T, context?: any): T => maxTimes(1, fn, context);

/**
 * Functional alternative to the standard for loop.
 *
 * @param repeatTimes
 * @param fn
 * @param args
 */
export const repeat = (repeatTimes: number, fn: (index: number, ...fnArgs: any[]) => void, ...args: any[]) => {
  for (let i = 0; i < repeatTimes; i++) { fn(i, ...args); }
};

/**
 * Functional alternative to the standard while loop.
 * @param repeatCondition
 * @param fn
 * @param args
 */
export const repeatWhile = (repeatCondition: () => boolean, fn: (...fnArgs: any[]) => void, ...args: any[]) => {
  while (repeatCondition()) { fn(...args); }
};

/**
 * Functional alternative to the standard for loop. Allows `await` usage inside loop code.
 *
 * @param repeatTimes
 * @param fn
 * @param args
 */
export const repeatAsync = async (
  repeatTimes: number,
  fn: (...args: any[]) => Promise<any>,
  ...args: any[]
) => {
  // eslint-disable-next-line no-await-in-loop
  for (let i = 0; i < repeatTimes; i++) { await fn(i, ...args); }
};

/**
 * Functional alternative to the standard while loop. Allows `await` usage inside loop code.
 * @param repeatCondition
 * @param fn
 * @param args
 */
export const repeatWhileAsync = async (
  repeatCondition: () => boolean,
  fn: (...args: any[]) => Promise<any>,
  ...args: any[]
) => {
  // eslint-disable-next-line no-await-in-loop
  while (repeatCondition()) { await fn(...args); }
};

/**
 * Like `repeat`, but provides a callable `done` function which can be used like a `break`
 * @param repeatTimes
 * @param fn
 * @param args
 */
export const repeatWithBreak = (
  repeatTimes: number,
  fn: ((i: number, done: CallableFunction, ...fnargs: any[]) => any),
  ...args: any[]
) => {
  let isDone = false;
  for (let i = 0; i < repeatTimes; i++) {
    // eslint-disable-next-line no-loop-func
    fn(i, () => { isDone = true; }, ...args);
    if (isDone) break;
  }
};

/**
 * Like `repeatAsync`, but provides a callable `done` function which can be used like a `break`
 * @param repeatTimes
 * @param fn
 * @param args
 */
export const repeatAsyncWithBreak = async (
  repeatTimes: number,
  fn: ((i: number, done: CallableFunction, ...fnargs: any[]) => Promise<any>),
  ...args: any[]
) => {
  let isDone = false;
  const setDone = () => { isDone = true; };
  for (let i = 0; i < repeatTimes; i++) {
    // eslint-disable-next-line no-await-in-loop
    await fn(i, setDone, ...args);
    if (isDone) break;
  }
};

/**
 * Call the function in `callMap`, indicated by the key in `callMap` matching the input `key`.
 * Optionally provide parameters using `args`
 *
 * @param key
 * @param callMap
 * @param args
 */
export const selectBranch = async <T extends CallableFunction>(
  key: string,
  callMap: HashOf<T>,
  ...args: any[]
) => {
  (callMap[key] ? callMap[key] : identity as CallableFunction)(key, ...args);
};

// const iif = <T>(condition: boolean, value: T, falseValue: T) => (condition ? value : falseValue);
// const select = <T extends string | number, U>(value: T, resultList: HashOf<U>) => (resultList[value]);

/**
 * Asynchronously loop over an Array or over a JS object as if it were an associative array. Inspired by the PHP implementation
 * of `foreach`, returning an array result similar to what you might get from `Array.prototype.map()`
 *
 * The differences between this and the synchronous `iterate` are:
 *  - Most importantly, the body of the provided function may `await` other asynchronous functions
 *  - This function itself is asynchronous and therefore can - and usually should - be awaited.
 *  - You must provide an async function (which therefore returns a Promise) as the second parameter
 *
 * @param hash
 * @param fn
 *
 * @returns {Promise<Array<U>>}
 */
export const iterateAsync = async <T, U>(
  hash: HashOf<T> | T[],
  fn: ((key: string, value: T) => Promise<U>),
): Promise<U[]> => {
  if (isArray(hash)) {
    return mapAsync(hash, (value, i) => fn(`${i}`, value));
  }
  return mapAsync(keys(hash), (key) => fn(`${key}`, (hash)[key] as T));
};
