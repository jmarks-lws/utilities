/**
 * Returns a section of an array.
 * @param array - The array to source the section from.
 * @param start — The beginning of the specified portion of the array.
 * @param end — The end of the specified portion of the array. This is exclusive of the element at the index 'end'.
 */
export const slice = <T>(
  array: T[],
  start: number = 0,
  end: number = Infinity,
): T[] => (
    array.slice(start, end)
  );
