/**
 * Returns a numeric representation of an input string.
 * The string represents one or more digits, with exactly one
 * optional decimal place, at any location in the string.
 * This may return NaN.
 * @param str String that represents a number, optionally with one decimal place.
 */
export const stringToNumber = (str: string): number => (
  /^((\d+(\.\d*)?)|\.\d+)$/.test(str) ? parseFloat(str) : NaN
);
