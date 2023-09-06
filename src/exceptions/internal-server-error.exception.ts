import { AppException } from './app.exception';

// 500 Internal Server Error
export class InternalServerErrorException extends AppException {
  constructor(message: string) {
    super(message);
  }
}
