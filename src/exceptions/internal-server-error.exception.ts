import { AppException } from './app.exception';

// 500 Internal Server Error
export class InternalServerErrorException extends AppException {
  constructor() {
    super('Internal Server Error', 500);
  }
}
