import { empty } from './empty';

/**
 * Opposite of `empty()`.
 */
export const notEmpty = (x: unknown): boolean => !empty(x);
