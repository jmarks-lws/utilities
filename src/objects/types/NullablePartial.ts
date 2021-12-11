/** Similar to partial, allows all properties of the type `T` to be `undefined` or `null` in addition to the types provided by the input `T` */
export type NullablePartial<T> = { [K in keyof T]: T[K] | null | undefined };
