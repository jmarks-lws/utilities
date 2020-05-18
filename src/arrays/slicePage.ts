import { slice } from './slice';

/**
 * Returns a section of an array using page size and number.
 * @param array - The array to source the section from.
 * @param pageNumber — The page to slice out.
 * @param pageSize — How many elements should represent a single page.
 */
export const slicePage = <T>(
  array: T[],
  pageNumber: number,
  pageSize: number,
): T[] => {
  const start = pageSize * (pageNumber - 1);
  const end = start + pageSize;
  return slice(array, start, end);
};
