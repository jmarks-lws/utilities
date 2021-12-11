/** Returns a type that sets the indicated fields `K` to allow them be non-defined (omitted or explicitly assign to `undefined`) */
export type PartialOn<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
