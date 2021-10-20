import {
  delay,
  retryAsync,
} from '../src/async';


describe('Async helpers tests', () => {
  test('delay', async () => {
    const time = Date.now();
    await delay(2000);
    expect(Date.now() - time).toBeGreaterThanOrEqual(2000);
  });
  test('retryAsync', async () => {
    const retrySchedule = [
      { error: true },
      { error: true },
      { error: false },
      { error: true },
      { error: true },
    ];

    let count = 0;

    const fn = async () => {
      const attempt = retrySchedule.shift();
      count++;
      if (attempt?.error) throw new Error(`Attempt ${count}`);
      return true;
    };

    const result = await retryAsync(fn, {
      delayFirstAttempt: false,
      attempts: 5,
      timeout: 1000,
    });

    expect(result).toBe(true);
    expect(count).toBe(3);
    expect(retrySchedule).toMatchObject([{ error: true }, { error: true } ]);
  });
});
