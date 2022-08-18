
import {
  repeat, repeatWithBreak, repeatAsync, repeatAsyncWithBreak, repeatWhile, repeatWhileAsync,
  isFunction, curry, mapAsync, identity, partial, spreadArgs, reverseArgs, maxTimes, maxOnce,
  take, branch, tryCatch, argsAsArray, selectBranch, reduceAsyncSequential, mapAsyncSequential, iterateAsync,
} from '../src/functional';
import { reduce } from '../src/array';

const sleep = (timeout: number) => new Promise<void>((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, timeout);
});
const sleepRandom = async () => {
  await sleep(Math.random() * 100);
};

describe('functional methods', () => {
  test('repeat runs 10 times', async () => {
    let c = 0;
    const l: number[] = [];
    repeat(10, (i) => {
      c++;
      l.push(i);
    });
    expect(c).toBe(10);
    expect(l).toMatchObject([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('repeatWhile runs 10 times', async () => {
    let c = 0;
    const l: number[] = [];
    repeatWhile(() => c < 10, () => {
      l.push(c);
      c++;
    });
    expect(c).toBe(10);
    expect(l).toMatchObject([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('repeatAsync runs 10 times', async () => {
    let c = 0;
    const l: number[] = [];
    await repeatAsync(10, async (i) => {
      c++;
      l.push(i);
    });
    expect(c).toBe(10);
    expect(l).toMatchObject([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('repeatWhileAsync runs 10 times', async () => {
    let c = 0;
    const l: number[] = [];
    await repeatWhileAsync(() => c < 10, async () => {
      l.push(c);
      c++;
    });
    expect(c).toBe(10);
    expect(l).toMatchObject([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('repeatWithBreak runs 10 times', async () => {
    let c = 0;
    const l: number[] = [];
    repeatWithBreak(10, (i) => {
      c++;
      l.push(i);
    });
    expect(c).toBe(10);
    expect(l).toMatchObject([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  test('repeatWithBreak runs 5 out of 10 times', async () => {
    let c = 0;
    const l: number[] = [];
    repeatWithBreak(10, (i, done) => {
      c++;
      l.push(i);
      if (c === 5) done();
    });
    expect(c).toBe(5);
    expect(l).toMatchObject([0, 1, 2, 3, 4]);
  });

  test('repeatAsyncWithBreak runs 10 times', async () => {
    let c = 0;
    const l: number[] = [];
    await repeatAsyncWithBreak(10, async (i) => {
      c++;
      l.push(i);
    });
    expect(c).toBe(10);
    expect(l).toMatchObject([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  test('repeatAsyncWithBreak runs 5 out of 10 times', async () => {
    let c = 0;
    const l: number[] = [];
    await repeatAsyncWithBreak(10, async (i, done) => {
      c++;
      l.push(i);
      if (c === 5) done();
    });
    expect(c).toBe(5);
    expect(l).toMatchObject([0, 1, 2, 3, 4]);
  });

  test('isFunction', async () => {
    expect(isFunction(1)).toBe(false);
    expect(isFunction('a')).toBe(false);
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(new Promise(() => {}))).toBe(false);
  });

  test('isFunction with key', async () => {
    const obj = {
      fn: () => {},
    };
    expect(isFunction(1)).toBe(false);
    expect(isFunction('a')).toBe(false);
    expect(isFunction(obj.fn)).toBe(true);
    expect(isFunction(new Promise(() => {}))).toBe(false);
    expect(isFunction(new Promise(obj.fn))).toBe(false);
  });

  test('curry', async () => {
    const add = (a: number, b: number) => a + b;
    const curried = curry(add);
    const step2 = curried(5);
    expect(step2).toBeInstanceOf(Function);
    expect(isFunction(step2)).toBe(true);
    expect(step2(5)).toBe(10);
    expect(curried(5, 5)).toBe(10);
  });

  test('mapAsync', async () => {
    const result = await mapAsync(
      [1, 2, 3],
      async (value) => value * 2,
    );
    expect(result).toMatchObject([2, 4, 6]);
  });

  test('identity', async () => {
    const a = { hello: 'world' };
    expect(identity(5)).toBe(5);
    expect(identity(a)).toBe(a);
  });

  test('partial', async () => {
    const partway = partial((a: number, b: number, c: number) => a + b + c, 1, 2);
    expect(partway).toBeInstanceOf(Function);
    expect(isFunction(partway)).toBe(true);
    expect(partway(3)).toBe(6);
  });

  test('spreadArgs', async () => {
    const sumFunction = (sumValues: number[]) => reduce(sumValues, (a, b) => a + b, 0);
    const spreadFunction = spreadArgs(sumFunction);
    expect(sumFunction).toBeInstanceOf(Function);
    const resultSum = sumFunction([1, 2, 3, 4]);
    const resultSpread = spreadFunction(1, 2, 3, 4);
    expect(resultSum).toBe(resultSpread);
  });

  test('argsAsArray', async () => {
    const sumFunction = (...sumValues: number[]) => reduce(sumValues, (a, b) => a + b, 0);
    const arrayFunction = argsAsArray(sumFunction);
    expect(sumFunction).toBeInstanceOf(Function);
    const resultSum = sumFunction(1, 2, 3, 4);
    const resultSpread = arrayFunction([1, 2, 3, 4]);
    expect(resultSum).toBe(resultSpread);
  });

  test('reverseArgs', async () => {
    const forwards = (dividend: number, divisor: number) => divisor / dividend;
    const backwards = reverseArgs(forwards);
    expect(forwards(1, 2)).toBe(backwards(2, 1));
  });

  test('maxTimes', async () => {
    let start = 1; // 1
    const addOne = () => { start += 1; };
    const addOneLimited = maxTimes(2, addOne);
    addOneLimited(); // 2
    addOneLimited(); // 3
    addOneLimited(); // 3
    expect(start).toBe(3);
  });

  test('maxOnce', async () => {
    let start = 1; // 1
    const addOne = () => { start += 1; };
    const addOneLimited = maxOnce(addOne);
    addOneLimited(); // 2
    addOneLimited(); // 2
    addOneLimited(); // 2
    expect(start).toBe(2);
  });

  test('take().from()', async () => {
    const obj = {
      name: 'James',
      value: 'abc',
      date: '2020-04-24',
    };
    expect(take('value', 'cba').from(obj)).toBe('abc');
    expect(take('firstName', 'Friend').from(obj)).toBe('Friend');
  });

  test('branch', async () => {
    const truePath = () => 'truth';
    const falsePath = () => 'falsehood';
    expect(branch(1 > 2, truePath, falsePath)(null)).toBe('falsehood');
    expect(branch(1 < 2, truePath, falsePath)(null)).toBe('truth');
    // No false param provided, so just identity of input.
    expect(branch(1 > 2, truePath)(null)).toBe(null);
    expect(branch(1 < 2, truePath)(null)).toBe('truth');
  });

  test('tryCatch', async () => {
    const a = 0;
    let b = 1;
    const c = await tryCatch(
      1,
      (x: any) => {
        throw new Error('artificial error');
      },
      (x: any, error: any) => {
        b += x;
        return 'Caught';
      },
      (x: any, results) => results.catchResult,
    );
    expect(a).toBe(0);
    expect(b).toBe(2);
    expect(c).toBe('Caught');
  });

  test('selectBranch', async () => {
    let result = -1;
    const callMap = {
      1: (val: any) => { result = 1; },
      2: (val: any) => { result = 2; },
      5: (val: any) => { result = 5; },
    };
    selectBranch('8', callMap);
    expect(result).toBe(-1);

    selectBranch('1', callMap);
    expect(result).toBe(1);
  });

  test('reduceAsyncSequential', async () => {
    const items = [
      { order: 1 },
      { order: 2 },
      { order: 3 },
    ];

    const result = await reduceAsyncSequential(items, async (acc, item) => {
      await sleepRandom();
      return [ ...acc, item ];
    }, [] as { order: number }[]);

    expect(result).toMatchObject(items);
  });

  test('mapAsyncSequential', async () => {
    const items = [
      { order: 1 },
      { order: 3 },
      { order: 2 },
    ];

    const result = await mapAsyncSequential(items, async (item) => {
      await sleepRandom();
      return item.order;
    });

    expect(result).toMatchObject([ 1, 3, 2 ]);
  });

  test('iterateAsync 1', async () => {
    const items = [
      { order: 1 },
      { order: 3 },
      { order: 2 },
    ];

    const result = await iterateAsync(items, async (key, item) => {
      await sleepRandom();
      return item.order;
    });

    expect(result).toMatchObject([ 1, 3, 2 ]);
  });

  test('iterateAsync 2', async () => {
    const items = {
      a: { order: 1 },
      b: { order: 3 },
      c: { order: 2 },
    };

    const result = await iterateAsync(items, async (key, item) => {
      await sleepRandom();
      return `${key}${item.order}`;
    });

    expect(result).toMatchObject([ 'a1', 'b3', 'c2' ]);
  });
});
