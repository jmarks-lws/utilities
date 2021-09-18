/**
 * Returns the first element from an array
 * @param array - The source array
 */
export const first = <T>([x]: T[]) : T | undefined => x;
export const head = first;
