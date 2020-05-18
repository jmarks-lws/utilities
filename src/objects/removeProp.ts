import { Hash } from './types/Hash';
import { pickNot } from './pickNot';
import { clone } from './clone';

/**
 * Returns an object that is the result of removing a field from `o` by name.
 */
export const removeProp = <T extends Hash>(o: T, field: (keyof T)): Partial<T> => (clone(pickNot(o, [ field ])));

/** alias for `removeProp` */
export const removeField = removeProp;
