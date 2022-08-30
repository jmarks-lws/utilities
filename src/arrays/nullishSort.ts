/* eslint-disable no-continue */

type TSortable = number | null | undefined;

type TNullishPlacement = 'first' | 'last' | 'omit';

/**
 * Merges two sorted arrays. These arrays may contain `null` or `undefined`.
 * @param left First sorted array.
 * @param right Second sorted array.
 * @param nullishPlacement Whether to omit or place null-ish values at the
 * start or end of the sorted array.
 */
export const mergeSortedArrays = (
  left: TSortable[],
  right: TSortable[],
  nullishPlacement: TNullishPlacement = 'omit',
): TSortable[] => {
  let i = 0;
  let j = 0;

  const merged: number[] = [];
  const leftNullishValues: TSortable[] = [];
  const rightNullishValues: TSortable[] = [];

  while (i < left.length || j < right.length) {
    if (left[i] == null && i < left.length) {
      leftNullishValues.push(left[i++]);
      continue;
    }

    if (right[j] == null && j < right.length) {
      rightNullishValues.push(right[j++]);
      continue;
    }

    if (right[j] == null || (left[i] ?? Infinity) < (right[j] ?? Infinity)) {
      merged.push(left[i++]!);
    } else {
      merged.push(right[j++]!);
    }
  }

  return [
    ...(nullishPlacement === 'first' ? leftNullishValues.concat(rightNullishValues) : []),
    ...merged,
    ...(nullishPlacement === 'last' ? leftNullishValues.concat(rightNullishValues) : []),
  ];
};

/**
 * Sorts an array of numbers that possibly contain numerous `null` or `undefined` values.
 * Uses an adaptation of the merge-sort algorithm that is stable, meaning that equal
 * numbers, and `null` and `undefined` values, retain their original relative positioning.
 * @param items Array of numbers, possibly including `null` or `undefined` values.
 * @param nullishPlacement Whether to omit or place null-ish values at the
 * start or end of the sorted array.
 */
export const nullishSort = (
  items: TSortable[],
  nullishPlacement: TNullishPlacement = 'omit',
): TSortable[] => {
  if (items.length === 1) {
    return items;
  }

  const middle = Math.floor(items.length / 2);

  return (
    mergeSortedArrays(
      nullishSort(items.slice(0, middle), nullishPlacement),
      nullishSort(items.slice(middle), nullishPlacement),
      nullishPlacement,
    )
  );
};
