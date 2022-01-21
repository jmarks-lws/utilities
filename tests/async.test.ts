import {
  delay,
  retryAsync,
  RetryError,
} from '../src/async';


describe('Async helpers tests', () => {
  test('delay', async () => {
    const time = Date.now();
    await delay(2000);
    expect(Date.now() - time).toBeGreaterThanOrEqual(2000);
  });
  test('retryAsync with options', async () => {
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
      echo: 'Retrying after error.',
    });

    expect(result).toBe(true);
    expect(count).toBe(3);
    expect(retrySchedule).toMatchObject([{ error: true }, { error: true } ]);
  });

  test('retryAsync with failure', async () => {
    const retrySchedule = [
      { error: true },
      { error: true },
      { error: true },
      { error: true },
      { error: true },
    ];

    let count = 0;

    const fn = async () => {
      const attempt = retrySchedule.shift();
      count++;
      if (attempt?.error) throw new Error(`Attempt ${count}. with failure`);
      return true;
    };

    const retryRunner = async () => retryAsync(fn, {
      delayFirstAttempt: false,
      attempts: 3,
      timeout: 1000,
      throwOnFail: () => new RetryError('Retry attempts exhausted.'),
    });

    // expect(fn).rejects.toThrow();
    await expect(retryRunner).rejects.toThrow('Retry attempts');
  });

  test('retryAsync with failure and default error', async () => {
    const retrySchedule = [
      { error: true },
      { error: true },
      { error: true },
      { error: true },
      { error: true },
    ];

    let count = 0;

    const fn = async () => {
      const attempt = retrySchedule.shift();
      count++;
      if (attempt?.error) throw new Error(`Attempt ${count}. with failure`);
      return true;
    };

    const retryRunner = async () => retryAsync(fn, {
      delayFirstAttempt: false,
      attempts: 3,
      timeout: 1000,
      echo: 'Retrying after error.',
    });

    await expect(fn).rejects.toThrow();
    await expect(retryRunner).rejects.toThrow('Retry attempts');
  });
});
