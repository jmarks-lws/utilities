
/** Wrapper for native `Array.isArray()` */
export const isArray = (x: unknown): x is any[] => Array.isArray(x);
