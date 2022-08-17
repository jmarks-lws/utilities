/**
 * Returns a numeric representation of an input string or `NaN` if the provided string value is not valid.
 * The string should consist one or more digits, with zero or one decimal point (period) within the string.
 * If the string does not match this pattern, this function will return `NaN`.
 * @param str String that should represent a number, with one optional decimal point.
 */
export const stringToNumber = (str: string): number => (
  /^((\d+(\.\d*)?)|\.\d+)$/.test(str) ? parseFloat(str) : NaN
);
