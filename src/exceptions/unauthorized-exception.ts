import { AppException } from './app.exception';

// 401 Unauthorized
export class UnauthorizedException extends AppException {
  constructor() {
    super('vc não tem autorização!');
  }
}
