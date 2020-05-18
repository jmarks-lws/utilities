
/** Wrapper for native `Array.isArray()` */
export const isArray = (x: any): x is any[] => Array.isArray(x);
