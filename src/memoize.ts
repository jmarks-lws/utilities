import objectHash from 'object-hash';

import { Hash, isDefinedObject } from './object';
import { def, map } from '.';

const memoizeWithProxy = <T extends CallableFunction>(
  f: T,
  cacheProxy: {
    get: (name: string) => any,
    set: (name: string, value: any) => any,
  },
): T => ((...args: any[]) => {
  const argStr = JSON.stringify(args);

  return cacheProxy.set(
    argStr,
    cacheProxy.get(argStr) || f(...args),
  );
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
    const argStr = JSON.stringify(
      map(
        args,
        (item: any) => (isDefinedObject(item) ? objectHash(item) : item),
      ),
    );
    cache[argStr] = cache[argStr] || fn(...args);
    return cache[argStr];
  }) as unknown as T;
};
