
/** Wrapper for native `Array.isArray()` */
export const isArray = <T>(x: T | T[]): x is T[] => Array.isArray(x);
