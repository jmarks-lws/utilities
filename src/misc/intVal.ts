/** Returns a non-fractional (integer) numeric representation of an input value. This may return NaN */
export const intVal = (x: unknown): number => parseInt(`${x ?? ''}`, 10);
