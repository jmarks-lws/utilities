import { reduce } from '../arrays/reduce';
import { Hash } from './types/Hash';
import { hasKey } from './hasKey';
import { merge } from './merge';
import { keys } from './keys';

/**
 * Returns a new object derived from `obj` where the keys are changed as described by `remap`, optionally including or omitting remaining data.
 *
 * @param obj Source object to remap keys
 * @param remap A map of key value pairs where the keys match keys from the source object and the values are the new object key names
 * @param returnAll Default `false`. If this is true, all data from the source object will be returned with only the key names in
 *                  `remap` being changed. All other keys and values will remain as they were in the source object.
 */
export const remapKeys = (obj: Hash, remap: Hash, returnAll: boolean = false): Hash => reduce(
  keys(obj) as string[],
  (acc: Hash, k: string) => merge(
    { ...acc },
    ((hasKey(remap, k) || returnAll) ? { [(hasKey(remap, k) ? remap[k] : k)]: obj[k] } : {}),
  ), {} as Hash,
);
