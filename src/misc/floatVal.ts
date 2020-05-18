/** Returns a fractional numeric representation of an input value. This may return NaN */
export const floatVal = (x: any): number => ((typeof x === 'number') ? x : parseFloat(x));
