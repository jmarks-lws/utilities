/**
 * Determines whether an array includes a certain element, returning true or false as appropriate.
 * Wrapper around `<array>.includes()`.
 * @param array - The array to search through.
 * @param needle - The element to search for
 * @param fromIndex - The position in this array at which to begin searching for searchElement
 */
export const includes = <T>(
  array: T[],
  needle: T,
  fromIndex: number = 0,
): boolean => array.includes(needle, fromIndex);
