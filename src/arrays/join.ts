/**
 * Create a string which is the result of concatenating the string values of each `array` element, using `delimiter` as a separator.
 * @param array
 * @param delimiter
 */
export const join = (
  array: any[],
  delimiter: string = ',',
): string => array.join(delimiter);
