import { CustomError } from './custom.error';

export class InternalServerError extends CustomError {
  statusCode = 500;

  reason = 'Internal Server Error';

  constructor(message?: string) {
    super(message || 'Internal Server Error');
    if (message) {
      this.reason = message;
    }
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors() {
    return [{
      message: this.reason
    }];
  }
}
