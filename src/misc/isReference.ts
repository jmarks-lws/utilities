import { isPrimitive } from './isPrimitive';

/** Convenience function. Returns true if the type of the provided value is a reference type */
export const isReference = (x: any): x is object => !isPrimitive(x);
