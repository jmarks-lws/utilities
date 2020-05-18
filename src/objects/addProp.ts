import { HashOf } from './types/HashOf';
import { merge } from './merge';

/**
 * Returns an object that is the result adding a property to `o`.
 * @param o
 * @param key
 * @param val
 */
export const addProp = <T>(o: HashOf<T>, key: string, val: T) => merge(o, { [key]: val });
/** alias for `addProp()` */
export const addField = addProp;
