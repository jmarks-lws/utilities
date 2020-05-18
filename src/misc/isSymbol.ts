/** Returns true if `x` is a `symbol`. */
export const isSymbol = (x: any): x is Symbol => (typeof x === 'symbol');
