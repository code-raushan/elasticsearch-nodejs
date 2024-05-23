import { CustomError } from './custom.error';

export class TooManyRequestsError extends CustomError {
  statusCode = 429;

  constructor() {
    super('Too Many Requests Error');

    Object.setPrototypeOf(this, TooManyRequestsError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Too Many Requests Error' }];
  }
}
