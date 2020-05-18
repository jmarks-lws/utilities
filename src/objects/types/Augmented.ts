import { Hash } from './Hash';

/** Indicates an object of `T` which may also have additional properties that are not explicitly defined */
export type Augmented<T> = T & Hash;
