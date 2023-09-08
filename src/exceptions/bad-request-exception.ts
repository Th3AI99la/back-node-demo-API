import { AppException } from './app.exception';

// 400 Bad Request
export class BadRequestException extends AppException {
  constructor(message: string) {
    super(message, 400);
  }
}
