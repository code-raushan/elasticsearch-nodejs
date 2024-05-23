import { CustomError } from './custom.error';

export class BadRequestError extends CustomError {
  statusCode = 400;

  reason = 'Bad Request';

  constructor(message?: string) {
    super(message || 'Bad Request');
    if (message) {
      this.reason = message;
    }
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{
      message: this.reason
    }];
  }
}
