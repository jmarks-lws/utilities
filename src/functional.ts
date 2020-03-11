import { hasKey, HashOf } from './object';
import {
  reverse, head, undef, tail,
} from './array';

export interface IMappableObject {
  map: (fn: (element: any, index: number, sourceArray: any[]) => any) => any[];
}

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

export const mapAsync = async <T, U>(
  list: T[],
  fn: ((x: T) => Promise<U>),
) => Promise.all(list.map(async (id) => fn(id)))

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


export const spreadArg = (fn: CallableFunction) => (...args: any[]) => fn(args);

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
