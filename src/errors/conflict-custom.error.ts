import { CustomError } from './custom.error';

export class ConflictErrorJSON extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not Authorized');

    Object.setPrototypeOf(this, ConflictErrorJSON.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not authorized' }];
  }
}
