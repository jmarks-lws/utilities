interface IPipeCaller<T> {
  (initialValue: T): T
}

interface IPipe {
  (...func: CallableFunction[]): IPipeCaller<any>;
}
interface IPipeAsync<T> {
  (...func: ((...input: T[]) => Promise<T>)[]): IPipeCaller<T>;
}

export const pipe: IPipe = (
  ...func: CallableFunction[]
) => (
  initialValue: any,
) => func.reduce((acc: any, currentFunc: CallableFunction) => (currentFunc ? currentFunc(acc) : acc), initialValue)

export const asyncPipe: IPipeAsync<any> = (
  ...func: ((input: any) => Promise<any>)[]
) => (
  initialValue: any,
) => func.reduce(async (acc: any, currentFunc: (input: any) => Promise<any>) => currentFunc(await acc), initialValue)
