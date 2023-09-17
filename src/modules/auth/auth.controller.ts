import { Request, Response, Router } from 'express';
import { AuthDTO } from './dtos/auth-insert.dto';
import { validadeAuth } from './auth.service';
import { ReturnError } from '@exceptions/dtos/return-error.dto';

// FUNÇÃO METODO GET - listar usuarios (APENAS A FUNÇÃO)
const authController = async (
  req: Request<undefined, undefined, AuthDTO>,
  res: Response,
): Promise<void> => {
  const user = await validadeAuth(req.body).catch((error) => {
    new ReturnError(res, error);
  });

  res.send(user);
};

// ROTAS
const authRouter = Router();
const router = Router();

// ENDERENÇO
authRouter.use('/auth', router);

// METODO POST - criar usuario
router.post('/', authController);

// EXPORTAÇÃO
export default authRouter;
