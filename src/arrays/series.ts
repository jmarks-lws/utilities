/**
 * Creates an array consisting of a series of sequential numbers.
 * @param n - How many elements to generate
 * @param startAt - Which number to start at. (default 0)
 */
export const series = (
  n: number,
  startAt: number = 0,
) => Array.from(Array(n).keys(), (k) => k + startAt);
