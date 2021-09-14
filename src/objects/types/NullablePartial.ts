export type NullablePartial<T> = { [K in keyof T]: T[K] | null | undefined };
