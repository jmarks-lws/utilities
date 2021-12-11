
/** Wrapper for native `Array.isArray()` */
export const isArray = <T>(x: T[] | unknown): x is T[] => Array.isArray(x);
