import { CustomError } from './custom.error';

export class NotFoundError extends CustomError {
  statusCode = 404;

  reason = 'Not Found';

  constructor(message?: string) {
    super(message || 'Not Found');
    if (message) this.reason = message;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{
      message: this.reason
    }];
  }
}
