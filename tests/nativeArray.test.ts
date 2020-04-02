import * as A from '../src/array';
import * as N from '../src/nativeArray';
import { repeat } from '../src/functional';


const generateSourceData = <T>(numItems: number, generatorFn: (() => T)): T[] => [
  generatorFn(),
  ...(numItems > 1
    ? generateSourceData(numItems - 1, generatorFn)
    : []),
];

const getRandomCharacterFromString = (str: string): string => str[Math.floor(Math.random() * str.length)]

const getRandomElementFromArray = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)]

const generateRandomString = (
  numCharacters: number,
  fromList: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
): string => (
  getRandomCharacterFromString(fromList)
  + (numCharacters > 1 ? generateRandomString(numCharacters - 1, fromList) : '')
);

const generateRandomStringRange = (
  minCharacters: number,
  maxCharacters: number,
  fromList: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
): string => (
  generateRandomString(Math.floor((Math.random() * (maxCharacters - minCharacters)) + minCharacters), fromList)
)

const sourceData = generateSourceData(1000, () => ({
  first: generateRandomStringRange(4, 14),
  hello: generateRandomStringRange(5, 10),
  tough: generateRandomStringRange(6, 9),
}));

const c = getRandomCharacterFromString('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890')
const g = generateRandomString(1000);

const getBenchmark = (repeatTimes: number, fn: CallableFunction, ...args: any[]) => {
  const startTime = performance.now();
  repeat(repeatTimes, fn, ...(args));
  const endTime = performance.now();
  return endTime - startTime;
}

const getXRandomFromArray = <T>(numToGet: number, array: T[]): T[] => {
  const out: T[] = [] as T[];
  repeat(numToGet, () => out.push(getRandomElementFromArray(array)));
  return out;
}

describe('Benchmark tests', () => {
  test('Source data is correctly prepared', async () => {
    expect(c).toHaveLength(1);
    expect(g).toHaveLength(1000);
    expect(sourceData).toHaveLength(1000);
  });
  test('`concat()`: Native vs. Custom', async () => {
    const times = 1000;
    const nativeTest = () => {
      const concatItemsA = getXRandomFromArray(10, sourceData);
      const concatItemsB = getXRandomFromArray(10, sourceData);
      const concatItemsC = getXRandomFromArray(10, sourceData);
      const concatItemsD = getXRandomFromArray(10, sourceData);
      const concatItemsE = getXRandomFromArray(10, sourceData);
      return getBenchmark(times, () => {
        N.nativeConcat(concatItemsA, concatItemsB, concatItemsC, concatItemsD, concatItemsE);
      })
    }
    const customTest = () => {
      const concatItemsA = getXRandomFromArray(10, sourceData);
      const concatItemsB = getXRandomFromArray(10, sourceData);
      const concatItemsC = getXRandomFromArray(10, sourceData);
      const concatItemsD = getXRandomFromArray(10, sourceData);
      const concatItemsE = getXRandomFromArray(10, sourceData);
      return getBenchmark(times, () => {
        A.concat<any>(concatItemsA, concatItemsB, concatItemsC, concatItemsD, concatItemsE);
      })
    }

    const nativeTestResult = nativeTest();
    const customTestResult = customTest();

    // console.log({
    //   nativeTestResult,
    //   customTestResult,
    // })

    expect(nativeTestResult).toBeLessThan(customTestResult);
  })
  test('`filter()`: Native vs. Custom', async () => {
    const times = 1000;
    const concatItemsA = getXRandomFromArray(100, sourceData);
    const nativeTest = () => getBenchmark(times, () => {
      N.nativeFilter(concatItemsA, (x) => x.first.includes('a'));
    })
    const customTest = () => getBenchmark(times, () => {
      A.where(concatItemsA, (x) => x.first.includes('a'));
    })

    const nativeTestResult = nativeTest();
    const customTestResult = customTest();

    // console.log({
    //   nativeTestResult,
    //   customTestResult,
    // })

    expect(nativeTestResult).toBeLessThan(customTestResult);
  })
})
