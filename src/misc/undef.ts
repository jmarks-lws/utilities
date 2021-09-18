/** Returns true if `x` is undefined. */
export const undef = (x: unknown): x is undefined => typeof x === 'undefined';
/** Alias for `undef` */ export const notDef = undef;
/** Alias for `undef` */ export const isUndefined = undef;
