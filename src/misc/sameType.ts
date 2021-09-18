
export const sameType = <T extends unknown>(a: T, b: unknown): b is T => (typeof a === typeof b);
