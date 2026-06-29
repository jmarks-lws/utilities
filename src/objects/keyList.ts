import { keys } from './keys';
import { Hash } from './types/Hash';

/**
 * Exactly like `Object.keys`, but different. Return type ensures keys of the provided object, which helps immensely
 * with typescript (and usuallay javascript) intellisense software that can read typescript definition files.
 * @param o Object to get keys from
 */
export const keyList = <T>(o: T) => keys(o as Hash) as (keyof T)[];
