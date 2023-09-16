import { AppException } from './app.exception';

// 401 Unauthorized
export class UnauthorizedException extends AppException {
  constructor() {
    super('Voce não possui autorização !', 401);
  }
}
