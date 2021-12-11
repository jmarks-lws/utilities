/** Returns a type that converts the type of a given key in and original object to a new type  */
export type TransformProp<T extends object, K extends string | number | symbol, TNew> = {
  [P in keyof T]: P extends K ? TNew : T[P];
};
