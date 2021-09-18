/** Returns true if `x` is a `boolean`. */
export const isBoolean = (x: unknown): x is boolean => (typeof x === 'boolean');
