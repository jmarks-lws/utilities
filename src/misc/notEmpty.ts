import { empty } from './empty';

/**
 * Opposite of `empty()`.
 */
export const notEmpty = (x: any): boolean => !empty(x);
