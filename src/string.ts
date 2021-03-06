import { isNumber, intVal } from './miscellaneous';

/** Pads a string (`subject`) by prepending enough `prefixCharacter`s to create a string with a length `desiredLength` */
export const padLeft = (subject: string, desiredLength: number, prefixCharacter: string = ' '): string => (
  subject.padStart(desiredLength, prefixCharacter)
);
/** alias for `padLeft` */
export const padStart = padLeft;

/** Pads a string (`subject`) by appending enough `suffixCharacter`s to the right side to create a string with a length `desiredLength` */
export const padRight = (subject: string, desiredLength: number, prefixCharacter: string = ' '): string => (
  subject.padEnd(desiredLength, prefixCharacter)
);
/** alias for `padRight` */
export const padEnd = padRight;

/**
 * Compares two strings for case insensitive equality.
 * @param a first string to compare
 * @param b second string to compare
 */
export const iEqual = (a: string, b: string): boolean => a.toLowerCase() === b.toLowerCase();
