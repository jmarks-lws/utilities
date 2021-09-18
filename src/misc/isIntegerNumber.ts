/** Returns true if `x` is a `number` with no fractional data. */
export const isIntegerNumber = (x: unknown): boolean => (typeof x === 'number') && x === Math.floor(x);
