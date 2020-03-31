
interface INativeReduceSignature {
  <T, U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U
}

export const nativeConcat = <T>(
  array: T[],
  ...items: ConcatArray<any>[]
): any[] => Array.prototype.concat.call(array, ...items);
export const nativeFilter = <T>(
  array: T[],
  fn: (value: any, index: number, array: T[]) => boolean,
): T[] => Array.prototype.filter.call(array, fn);
export const nativeFindIndex = <T>(
  array: T[],
  fn: (value: any, index: number, obj: any[]) => unknown, thisArg?: any,
): number => Array.prototype.findIndex.call(array, fn);
export const nativeIncludes = <T>(
  array: T[],
  searchElement: any,
  fromIndex?: number | undefined,
): boolean => Array.prototype.includes.call(array, searchElement, fromIndex);
export const nativeIndexOf = <T>(
  array: T[],
  searchElement: any,
  fromIndex?: number | undefined,
): number => Array.prototype.indexOf.call(array, searchElement, fromIndex);
export const nativeMap = <T, U>(
  array: T[],
  fn: (value: any, index: number, array: any[]) => U, thisArg?: any,
): U[] => Array.prototype.map.call(array, fn) as U[];
export const nativeReduce = <T, U>(
  array: T[],
  fn: (previousValue: U, currentValue: T, currentIndex: number, array: any[]) => U,
  initialValue: U,
): U => (Array.prototype.reduce.bind(array))(fn, initialValue);

// call<T, A extends any[], R>(this: (this: T, ...args: A) => R, thisArg: T, ...args: A): R;
export const nativeReduceRight = Array.prototype.reduceRight;
export const nativeReverse = Array.prototype.reverse;
export const nativeSlice = Array.prototype.slice;
