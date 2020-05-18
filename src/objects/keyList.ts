import { keys } from './keys';

/**
 * Exactly like `Object.keys`, but different. Return type ensures keys of the provided object, which helps immensely
 * with typescript (and usuallay javascript) intellisense software that can read typescript definition files.
 * @param o Object to get keys from
 */
export const keyList = <T>(o: T) => keys(o) as (keyof T)[];
