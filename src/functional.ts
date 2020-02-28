
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
