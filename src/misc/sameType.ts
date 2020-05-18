
export const sameType = <T extends any>(a: T, b: any): b is T => (typeof a === typeof b);
