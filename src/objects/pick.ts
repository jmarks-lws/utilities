import { reduce } from '../arrays/reduce';
import { intersect } from '../arrays/intersect';
import { Hash } from './types/Hash';
import { keys } from './keys';

export const pick = <T extends Hash>(obj: T, fields: Array<keyof T>): Partial<T> => (
  reduce(
    intersect(keys(obj), fields as string[]),
    (prev: Hash, f: any) => ({ ...prev, [f]: obj[f] }),
    {} as Partial<T>,
  )
);
