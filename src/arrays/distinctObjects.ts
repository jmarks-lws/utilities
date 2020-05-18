import { reduce } from './reduce';
import { hasAny } from './hasAny';
import { identical } from '../objects/identical';
import { Hash } from '../objects/types/Hash';

/**
 * Helper method: Returns an array consisting only of distinct values. Intended for arrays containing a set of
 * objects, which may have different reference values, but have the potential to contain repeat data.
 * @param array - array to filter
 */
export const distinctObjects = <T extends Hash>(
  array: Array<T>,
) => reduce(array, (acc, el) => {
    const alreadyProcessed = hasAny(acc, (curr) => identical(curr, el));
    return alreadyProcessed ? [ ...acc ] : [ ...acc, el ];
  }, [] as T[]);
