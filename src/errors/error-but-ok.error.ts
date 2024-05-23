import { CustomError } from './custom.error';

export class ErrorButOkError extends CustomError {
  statusCode = 200;

  constructor() {
    super('Error But We Handled It');

    Object.setPrototypeOf(this, ErrorButOkError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Error But Ok' }];
  }
}
