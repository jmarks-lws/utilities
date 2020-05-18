import { hasKey } from './hasKey';
import { Nullable } from '../misc/types/Nullable';
import { Hash } from './types/Hash';

/**
 * Safely get a value from an object
 * @param obj
 * @param field
 */
export const pluck = <T extends any>(
  obj: Hash,
  field: string,
): Nullable<T> => (hasKey(obj, field) ? obj[field] : null);
