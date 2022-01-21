import { delay } from './delay';
import { RetryError } from './types/RetryError';

export interface IRetryAsyncOptions {
  timeout: number,
  attempts: number,
  delayFirstAttempt: boolean,
  echo?: string,
  throwOnFail?: () => Error,
}

const retryAsyncDefaultOptions = {
  timeout: 60000,
  attempts: 5,
  delayFirstAttempt: false,
} as IRetryAsyncOptions;

/**
 * Retry an asynchronous operation multiple times until errors are not thrown. Use options to manage timeout and attempts.
 * @param fn - an asynchronous function with no arguments. If this returns a value, retryAsync will return the same value when successful.
 * @param options.delayFirstAttempt - whether the first attempt should be delayed. defaults to `false`.
 * @param options.timeout - time in milliseconds before making each attempt. defaults to 60 seconds.
 * @param options.attempts - total number of attempts before final failure. defaults to 5.
 * @param options.echo? - what, if anything, to output before each retry.
 * @param options.throwOnFail? - a custom error to throw on final failure. If not provided a default error will be thrown.
 *    }
 */
export const retryAsync = async <T extends unknown>(
  fn: () => Promise<T>,
  options: IRetryAsyncOptions,
): Promise<T> => {
  const _options = {
    ...retryAsyncDefaultOptions,
    ...options,
  } as IRetryAsyncOptions;

  try {
    return await fn();
  } catch (error) {
    if (_options.attempts > 1) {
      await delay(_options.timeout);
      if (_options.echo) console.log(_options.echo); // eslint-disable-line no-console
      return retryAsync(fn, {
        ..._options,
        attempts: _options.attempts - 1,
        delayFirstAttempt: true, // After "true" first attempt, all attempts should be delayed.
      });
    }
    throw (
      _options.throwOnFail
        ? _options.throwOnFail()
        : new RetryError(`Retry attempts exhausted. Attempts: ${_options.attempts}, Interval: ${_options.timeout}`)
    );
  }
};
