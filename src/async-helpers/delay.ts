/**
 * Asynchronously delays for a period of time before resolving a promise. Resolves with the delay time.
 * @param milliseconds - amount of time to wait before resolving the promise. This will be returned as the resolved value.
 */
export const delay = (milliseconds: number) => (
  new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(milliseconds);
    }, milliseconds);
  })
);
