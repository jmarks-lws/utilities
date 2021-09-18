/** Returns true if `x` is a `number`. NaN is considered a number and so will return `true`. Does not return true for `BigInt`. */
export const isNumber = (x: unknown): x is number => (typeof x === 'number');
