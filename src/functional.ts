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
export const isFunction = (x: any, key?: string) => (
  def(key) ? key && hasKey(x, key) && (typeof x[key as string] === 'function') : (typeof x === 'function')
);

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
}

/**
 * Like `map()`, but awaitable. This way you can ensure mapped async functions have resolved, if desired.
 * @param list
 * @param fn
 */
export const mapAsync = async <T, U>(
  list: T[],
  fn: ((x: T) => Promise<U>),
) => Promise.all(list.map(async (id) => fn(id)))

/**
 * Deprecate: Hindsight being what it is, this isn't the greatest idea.
 * @param key
 * @param defaultValue
 */
export const take = <T>(key: string, defaultValue?: T) => ({
  from: (object: HashOf<T>) => (hasKey(object, key) ? object[key] : defaultValue),
});

/**
 * Returns the value given. Intended for used in some branching expressions as a means of ensuring
 * we always return a function value to reduce complexity otherwise introduced with null checking, etc.
 * @param id
 */
export const identity = (id: any) => id;

/**
 * Partially apply a function by filling in any number of its arguments.
 * Note: We will often lose some of typescript's intellisense when using `partial()`
 * @param fn The function to partially apply
 * @param args Some arguments. Does not have to be all of the arguments needed for the base function.
 */
export const partial = (fn: CallableFunction, ...args: any[]) => (...newArgs: any[]) => fn(...args, ...newArgs);

/**
 * Wraps a function that normally accepts a single array as an argument so that elements can be provided as individual parameters
 * @param fn
 */
export const spreadArgs = (fn: (arg: any[]) => any) => (...args: any[]) => fn(args);

/**
 * Reverses the order of arguments in a function call. Helpful for many 'functional programming' tasks.
 * @param fn
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
  falsePath: ((x: T) => any),
) => (x: T) => (condition ? truePath(x) : falsePath(x));

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
  }

// TODO: Test more thoroughly before using in prod.
export const tryCatchManyAsync = <T>(
  initialPath: ((x: T, error?: any) => Promise<any>),
  ...catchPaths: Array<((x: T, error?: any) => Promise<any>)>
) => async (x: T, err?: any): Promise<any> => {
    try {
      return await initialPath(x, err);
    } catch (error) {
      // TODO: Work with this until I can use a `branch()`/`branchAsync()`
      const init = head(catchPaths);
      if (undef(init)) throw err;
      return tryCatchManyAsync(init, ...tail(catchPaths))(x, error);
    }
  }

/**
 * Wrap a function so that it will only run at most `times` times when called from the resulting wrapper
 * @param times - Number of times to allow this function to run
 * @param fn - Function to wrap
 * @param context - An optional context to provide `this` for the enclosed function.
 */
export const maxTimes = (times: number = 1, fn: (...args: any[]) => any, context?: any) => {
  let ranTimes: number = 0;

  return function someFunction(this: any, ...args: any[]) {
    if (ranTimes >= times) return null;
    ranTimes += 1;
    return fn.apply(context || this, args);
  };
}

/**
 * Convenience method providing a wrapper that can only run an enclosed function once. Delegates to `doTimes`
 * @param fn - Function to wrap
 * @param context - An optional context to provide `this` for the enclosed function.
 */
export const maxOnce = (fn: (...args: any[]) => any, context: any) => maxTimes(1, fn, context)

const internalRepeat = (repeatTimes: number, fn: CallableFunction, index: number, ...args: any[]) => {
  fn(index, ...args);
  if (repeatTimes > 1) internalRepeat(repeatTimes - 1, fn, index + 1, ...args);
}
export const repeat = (repeatTimes: number, fn: (index: number, ...fnArgs: any[]) => void, ...args: any[]) => {
  internalRepeat(repeatTimes, fn, 0, ...args);
}

const internalRepeatAsync = async (
  repeatTimes: number,
  fn: (...args: any[]) => Promise<any>,
  index: number,
  ...args: any[]
) => {
  await fn(index, ...args);
  if (repeatTimes > 1) await internalRepeatAsync(repeatTimes - 1, fn, index + 1, ...args);
}
export const repeatAsync = async (
  repeatTimes: number,
  fn: (...args: any[]) => Promise<any>,
  ...args: any[]
) => {
  await internalRepeatAsync(repeatTimes, fn, 0, ...args);
}

const internalRepeatWithBreak = (
  repeatTimes: number,
  fn: ((i: number, done: CallableFunction, ...fnargs: any[]) => any),
  index: number,
  ...args: any[]
) => {
  let isDone = false;
  fn(index, (() => { isDone = true }), ...args);
  if (repeatTimes > 1 && !isDone) internalRepeatWithBreak(repeatTimes - 1, fn, index + 1, ...args);
}
export const repeatWithBreak = (
  repeatTimes: number,
  fn: ((i: number, done: CallableFunction, ...fnargs: any[]) => any),
  ...args: any[]
) => {
  internalRepeatWithBreak(repeatTimes, fn, 0, ...args);
}

const internalRepeatAsyncWithBreak = async (
  repeatTimes: number,
  fn: ((i: number, done: CallableFunction, ...fnargs: any[]) => Promise<any>),
  index: number,
  ...args: any[]
) => {
  let isDone = false;
  await fn(index, (() => { isDone = true }), ...args);
  if (repeatTimes > 1 && !isDone) await internalRepeatAsyncWithBreak(repeatTimes - 1, fn, index + 1, ...args);
}
export const repeatAsyncWithBreak = async (
  repeatTimes: number,
  fn: ((i: number, done: CallableFunction, ...fnargs: any[]) => Promise<any>),
  ...args: any[]
) => {
  await internalRepeatAsyncWithBreak(repeatTimes, fn, 0, ...args);
}
