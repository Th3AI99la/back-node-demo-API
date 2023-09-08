import { AppException } from './app.exception';

// 404 Not Found
export class NotFoundException extends AppException {
  constructor(entity: string) {
    super(`${entity} not fouuund - 404 Not Found :(`);
  }
}
