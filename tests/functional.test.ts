
import {
  repeat, repeatWithBreak, repeatAsync, repeatAsyncWithBreak, repeatWhile, repeatWhileAsync,
} from '../src/functional';

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
  })

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
  })

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
})
