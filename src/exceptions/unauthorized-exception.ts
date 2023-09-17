import { AppException } from './app.exception';

// 401 Unauthorized
export class UnauthorizedException extends AppException {
  constructor() {
    super('Você não possui autorização ! <TOKEN REJEITADO>', 401);
  }
}
