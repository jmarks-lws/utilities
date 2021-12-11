/** Returns a type which is the result of converting all keys of a given type `TOld` into a new type `TNew` */
export type TransformPropType<T extends object, TOld, TNew> = {
  [P in keyof T]: T[P] extends TOld ? TNew : T[P];
};
