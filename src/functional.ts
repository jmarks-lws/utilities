import { hasKey, HashOf } from './object';
import { reverse, head, tail } from './array';
import { undef, def } from './miscellaneous';

/**
 * Interface used to identify a mappable object. According to most sources, this qualifies as
 * a "functor", but want to verify.
 */
export interface IMappableObject {
  map: (fn: (value: any, index: number, array: any[]) => any, thisArg?: any) => any[]
}

/**
 * Determines if the provided object or the key of the provided object is a function.
 * If only `x` is provided, then it will be the target. If both `x` and `key` are provided, `x[key]` is the target.
 * @param x
 * @param key
 */
export const isFunction = (x: any): x is Function => (typeof x === 'function');

// TODO: evaluate `either()`, `maybe()` etc
// export function either<T1 extends undefined, T2>(a: T1, b: T2): T2;
// export function either<T1 extends any, T2>(a: T1, b: T2): T1;
// export function either <T1 extends any, T2>(a: T1, b: T2): T1 | T2 {
//   return (a || b);
// }
// export const maybe = <T>(a: T): T | null => either(a, null);

/**
 * Returns a curried version of the provided function.
 * (Note: This will probably mess with your IDE's ability to provide intellisense)
 *
 * [Borrowed from Mostly Adequate Guide](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/content/appendix_a.html#curry)
 *
 * Signature: curry :: ((a, b, ...) => c) => a => b => ... => c
 * @param fn - Function to curry
 */
export const curry = (fn: Function) => {
  const arity = fn.length;

  return function $curry(...args: any[]): any {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
};

/**
 * Like `map()`, but awaitable. This way you can ensure mapped async functions have resolved, if desired.
 * @param list
 * @param fn
 */
export const mapAsync = async <T, U>(
  list: T[],
  fn: ((value: T, index: number, array: T[]) => Promise<U>),
) => Promise.all(list.map(async (id, ix, ar) => fn(id, ix, ar)));

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
export const identity = <T>(id: T) : T => id;

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
export const tryCatch = <T>(
  tryPath: ((x: T) => any),
  catchPath: ((x: T, error?: any) => any),
  finallyPath: ((x: T, results: ({ tryResult: any, catchResult: any })) => any),
) => (x: T) => {
    let tryResult: any = null;
    let catchResult: any = null;
    try {
      tryResult = tryPath(x);
    } catch (error) {
      catchResult = catchPath(x, error);
    } finally {
      finallyPath(x, { tryResult, catchResult });
    }
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

export const repeat = (repeatTimes: number, fn: (index: number, ...fnArgs: any[]) => void, ...args: any[]) => {
  for (let i = 0; i < repeatTimes; i++) { fn(i, ...args); }
};

export const repeatWhile = (repeatCondition: () => boolean, fn: (...fnArgs: any[]) => void, ...args: any[]) => {
  while (repeatCondition()) { fn(...args); }
};

export const repeatAsync = async (
  repeatTimes: number,
  fn: (...args: any[]) => Promise<any>,
  ...args: any[]
) => {
  // eslint-disable-next-line no-await-in-loop
  for (let i = 0; i < repeatTimes; i++) { await fn(i, ...args); }
};

export const repeatWhileAsync = async (
  repeatCondition: () => boolean,
  fn: (...args: any[]) => Promise<any>,
  ...args: any[]
) => {
  // eslint-disable-next-line no-await-in-loop
  while (repeatCondition()) { await fn(...args); }
};

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

export const selectBranch = async <T extends CallableFunction>(
  key: string,
  callMap: HashOf<T>,
  ...args: any[]
) => {
  (callMap[key] ? callMap[key] : identity as CallableFunction)(key, ...args);
};
