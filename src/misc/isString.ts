/** Returns true if `x` is a `string`. */
export const isString = (x: unknown): x is string => (typeof x === 'string');
