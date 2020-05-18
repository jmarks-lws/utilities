/** Returns true if `x` is a `bigint`. Does not return true for `Number`. */
export const isBigInt = (x: any): x is BigInt => (typeof x === 'bigint');
