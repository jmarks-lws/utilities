import { arrayEmpty } from '../arrays/arrayEmpty';
import { Hash } from './types/Hash';
import { head } from '../arrays/first';
import { tail } from '../arrays/tail';

/**
 * Returns a new object that is the result of merging together a series of objects. Values to the right
 * overwrite values before them.
 * @param {Hash[]} a - As many hashes as you like to merge together from left to right.
 */
export const merge = <T extends Hash>(
  ...a: Partial<T>[]
): T => {
  const t = tail(a);
  return ({
    ...head(a),
    ...(
      !arrayEmpty(t)
        ? merge(...t)
        : null
    ),
  } as T);
};
