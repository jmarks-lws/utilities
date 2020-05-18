import { Nullable } from '../misc/types/Nullable';

/** Shallow copy of an array. References remain intact. If a non-array is supplied, null is returned. */
export const arrayCopy = <T>(arr: T[]): Nullable<Array<T>> => (Array.isArray(arr) ? [...arr] : null);
