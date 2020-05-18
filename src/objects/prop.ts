import { hasKey } from './hasKey';
import { Hash } from './types/Hash';

/**
 * Gets a value from an object property with an optional default value.
 * @param o
 * @param key
 * @param defaultValue
 */
export const prop = (o: Hash, key: string, defaultValue: any = null): any => (hasKey(o, key) ? o[key] : defaultValue);
