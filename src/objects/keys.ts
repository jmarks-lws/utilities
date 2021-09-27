import { Hash } from './types/Hash';

/** Get (typed) keys of provided object */
export const keys = <T extends Hash, K extends keyof T>(o: T) => Object.keys(o) as any as K[];
