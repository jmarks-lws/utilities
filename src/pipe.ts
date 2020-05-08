export interface IPipeCaller<TIn, TOut> {
  (initialValue: TIn): TOut
}

export interface IPipe {
  <T, U>(...func: CallableFunction[]): IPipeCaller<T, U>;
}
interface IPipeAsync<T, U> {
  (...func: ((...input: T[]) => Promise<T>)[]): IPipeCaller<T, U>;
}

export const pipe: IPipe = <T, U>(
  ...func: CallableFunction[]
): IPipeCaller<T, U> => (
    initialValue: T,
  ) => func.reduce((acc: any, currentFunc: CallableFunction) => (currentFunc ? currentFunc(acc) : acc), initialValue);

// TODO: This probaby does not work as expected, try setting it up as <T>( ... func (...)) => {...}
export const pipeAsync: IPipeAsync<any, any> = (
  ...func: ((input: any) => Promise<any>)[]
) => (
  initialValue: any,
) => func.reduce(async (acc: any, currentFunc: (input: any) => Promise<any>) => currentFunc(await acc), initialValue);
/**
 * alias for pipeAsync for backward compatibility. to be removed
 * @deprecated
 */
export const asyncPipe = pipeAsync;
