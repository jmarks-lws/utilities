import { Hash } from './types/Hash';

/** Get (typed) keys of provided object */
export const keys = <T extends Hash>(o: T): (keyof T)[] => Object.keys(o) as any as (keyof T)[];
