/** Represents a type such as a class that can create a new instance of a given type `T` */
export interface Constructor<T> { new (...args: any[]): T }
