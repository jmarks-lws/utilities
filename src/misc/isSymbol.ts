/** Returns true if `x` is a `symbol`. */
export const isSymbol = (x: unknown): x is Symbol => (typeof x === 'symbol');
