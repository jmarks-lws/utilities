import objectHash from './object-hash';

import { Hash, isDefinedObject } from './object';
import { def, map } from '.';

const deriveKey = (args: unknown[]): string => JSON.stringify(
  map(
    args,
    (item: unknown) => (isDefinedObject(item) ? objectHash(item) : item),
  ),
);

const isThenable = (value: unknown): value is Promise<unknown> => (
  isDefinedObject(value) && typeof (value as { then?: unknown }).then === 'function'
);

const memoizeWithProxy = <T extends CallableFunction>(
  f: T,
  cacheProxy: {
    get: (name: string) => unknown,
    set: (name: string, value: unknown) => unknown,
  },
): T => ((...args: unknown[]) => {
  const argStr = deriveKey(args);

  const cached = cacheProxy.get(argStr);
  if (cached !== undefined) return cached;

  const value = f(...args);
  // Evict rejected promises so a later call re-invokes the function.
  if (isThenable(value)) {
    value.catch(() => { cacheProxy.set(argStr, undefined); });
  }
  cacheProxy.set(argStr, value);
  return value;
}) as unknown as T;

/**
 * Memoize a function. Returns a function, which when called multiple times
 * with the same parameters, will return a cached response.
 * `cacheProxy` is recommended as default caching does not expire.
 *
 * @param fn - The function to memoize. Can be any function at all.
 * @param cacheProxy - A proxy object that provides a getter and setter which is expected to manage cached data.
 *                     Works great with in memory caches that expire such as `redis` and `node-cache`
 */
export const memoize = <T extends CallableFunction>(
  fn: T,
  cacheProxy?: {
    get: (name: string) => any,
    set: (name: string, value: any) => any,
  },
): T => {
  if (def(cacheProxy)) return memoizeWithProxy(fn, cacheProxy!);

  const cache: Hash = {};

  return ((...args: any[]) => {
    const argStr = deriveKey(args);
    if (!(argStr in cache)) {
      const value = fn(...args);
      // Evict rejected promises so a later call re-invokes the function.
      if (isThenable(value)) {
        value.catch(() => { delete cache[argStr]; });
      }
      cache[argStr] = value;
    }
    return cache[argStr];
  }) as unknown as T;
};
