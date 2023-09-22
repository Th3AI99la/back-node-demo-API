import { UserTypeEnum } from '@enums/user-type.enum';
import { ReturnError } from '@exceptions/dtos/return-error.dto';
import { NoAdmUnauthorizedAccess } from '@exceptions/noAdm-unauthorized-access';
import { UserAuth } from '@modules/auth/dtos/user-auth.dto';
import { verifyToken } from '@utils/auth';
import { NextFunction, Request, Response } from 'express';

// RESTRIGIR CONTEUDO (USER = 1 e ADMIN = 2)
export const authAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authorization = req.headers.authorization;

  await verifyToken(authorization)
    .then((user: UserAuth) => {
      // Retorne uma resposta de erro quando o usuário não for um administrador.
      if (user.typeUser !== UserTypeEnum.ADMIN) {
        new ReturnError(res, new NoAdmUnauthorizedAccess());
      } else {
        // Continue a execução quando o usuário for um administrador.
        next();
      }
    })
    // Retorne uma resposta de erro em caso de erro na verificação do token.
    .catch((error) => {
      new ReturnError(res, error);
    });
};

// VERIFICA O TOKEN E RETORNA SE TEM ERRO.
