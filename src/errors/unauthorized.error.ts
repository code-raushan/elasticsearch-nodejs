import { CustomError } from './custom.error';

export class UnauthorizedError extends CustomError {
  statusCode = 401;

  reason = 'Not Authorized';

  constructor(message?: string) {
    super(message || 'Not Authorized');
    if (message) {
      this.reason = message;
    }
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }


  serializeErrors() {
    return [{ message: 'Not authorized' }];
  }
}
