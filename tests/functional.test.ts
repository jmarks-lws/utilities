
import {
  repeat, repeatWithBreak, repeatAsync, repeatAsyncWithBreak,
} from '../src/functional';

describe('functional methods', () => {
  test('repeat runs 10 times', async () => {
    let c = 0;
    repeat(10, () => c++);
    expect(c).toBe(10);
  });
  test('repeatAsync runs 10 times', async () => {
    let c = 0;
    await repeatAsync(10, async () => c++);
    expect(c).toBe(10);
  });

  test('repeatWithBreak runs 10 times', async () => {
    let c = 0;
    repeatWithBreak(10, () => c++);
    expect(c).toBe(10);
  });
  test('repeatWithBreak runs 5 out of 10 times', async () => {
    let c = 0;
    repeatWithBreak(10, (done) => { c++; if (c === 5) done(); });
    expect(c).toBe(5);
  });

  test('repeatAsyncWithBreak runs 10 times', async () => {
    let c = 0;
    await repeatAsyncWithBreak(10, async () => c++);
    expect(c).toBe(10);
  });
  test('repeatAsyncWithBreak runs 5 out of 10 times', async () => {
    let c = 0;
    await repeatAsyncWithBreak(10, async (done) => { c++; if (c === 5) done(); });
    expect(c).toBe(5);
  });
})
