export interface IPipeCaller<T> {
  (initialValue: T): T
}

export interface IPipe {
  <T>(...func: CallableFunction[]): IPipeCaller<T>;
}
interface IPipeAsync<T> {
  (...func: ((...input: T[]) => Promise<T>)[]): IPipeCaller<T>;
}

export const pipe: IPipe = <T>(
  ...func: CallableFunction[]
): IPipeCaller<T> => (
    initialValue: T,
  ) => func.reduce((acc: any, currentFunc: CallableFunction) => (currentFunc ? currentFunc(acc) : acc), initialValue);

// TODO: This probaby does not work as expected, try setting it up as <T>( ... func (...)) => {...}
export const pipeAsync: IPipeAsync<any> = (
  ...func: ((input: any) => Promise<any>)[]
) => (
  initialValue: any,
) => func.reduce(async (acc: any, currentFunc: (input: any) => Promise<any>) => currentFunc(await acc), initialValue);
/**
 * alias for pipeAsync for backward compatibility. to be removed
 * @deprecated
 */
export const asyncPipe = pipeAsync;
