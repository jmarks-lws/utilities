import { intersect } from './array';

export interface Hash { [index:string]: any }
export interface HashOf<T> { [index:string]: T }

export const { keys, values } = Object;

/**
 * Returns a new object that is the result of projecting only the properties specified by `fields`
 * @param obj - The object to project
 * @param fields - The fields to project from that object
 */
export const pick = (obj: Hash, fields: string[]) : Hash => intersect(
  keys(obj),
  fields,
).reduce(
  (prev: Hash, f: any) => ({ ...prev, [f]: obj[f] }),
  {} as Hash,
);

/**
 * Returns a new object with a subset of properties where properties which have null or undefined values have been removed.
 * @param o
 */
export const compactObject = (o: any) => pick(o, keys(o).filter((key) => ![undefined, null].includes(o[key])));

/**
 * Returns a new object that is the result of merging together two objects. If both `a` and `b` have values
 * for the same property, the resulting object will receive the value for that property from object `b`.
 * @param {Hash} a
 * @param {Hash} b
 */
export const merge = (a: Hash, b: Hash) : Hash => ({ ...a, ...b })

export const getSharedKeys = (a: Hash, b: Hash) : Array<string> => keys(a).filter((p) => keys(b).includes(p));
