import { CustomError } from './custom.error';

export class ForbiddenError extends CustomError {
  statusCode = 403;

  reason = 'No route exists';

  constructor(message?: string) {
    super(message || 'Not Found');
    if (message) this.reason = message;
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
