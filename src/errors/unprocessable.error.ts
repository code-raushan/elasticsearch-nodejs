import { CustomError } from './custom.error';

export class UnprocessableError extends CustomError {
  statusCode = 422;

  constructor() {
    super('Unprocessable Error');

    Object.setPrototypeOf(this, UnprocessableError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Unprocessable Error' }];
  }
}
