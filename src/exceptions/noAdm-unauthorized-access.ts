import { AppException } from './app.exception';

// 401 -  Unauthorized ADMIN (thalles)
export class NoAdmUnauthorizedAccess extends AppException {
  constructor() {
    super('Você não tem acesso de administrador ! <TOKEN REJEITADO>', 401);
  }
}
