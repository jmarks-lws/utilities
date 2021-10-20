
export class RetryError extends Error {
  innerErrorMessage: string;

  constructor(message: string, innerErrorMessage?: string) {
    super(message);
    this.innerErrorMessage = innerErrorMessage ?? '';
  }

  toString() {
    return `${this.message} [${this.innerErrorMessage}]`;
  }
}
