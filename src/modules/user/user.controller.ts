import { Request, Response, Router } from 'express';
import { createUser, getUsers, deleteUser, updateUser } from './user.service';
import { UserInsertDTO } from './dtos/user-insert.dto';
import { ReturnError } from '@exceptions/dtos/return-error.dto';
import { NotFoundException } from '@exceptions/not-found-exception';
import { verifyToken } from 'src/utils/auth';

const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

// METODO GET - listar usuarios
router.get('/', async (req: Request, res: Response): Promise<void> => {
  const authorization = req.headers.authorization;

  verifyToken(authorization).catch((error) => {
    new ReturnError(res, error);
  });

  console.log('authorization', authorization);

  const users = await getUsers().catch((error) => {
    // quando buscar e não retornar nenhum valor, ele exibe o 204 - NotFoundException
    if (error instanceof NotFoundException) {
      res.status(204);
    } else {
      new ReturnError(res, error);
    }
  });
  res.send(users);
});

// METODO POST - criar usuario
router.post(
  '/',
  async (req: Request<undefined, undefined, UserInsertDTO>, res: Response): Promise<void> => {
    const user = await createUser(req.body).catch((error) => {
      new ReturnError(res, error);
    });

    res.send(user);
  },
);

// METODO DELETE - deletar usuario (ChatGPT)
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  const userIdString = req.params.id;

  const userId = parseInt(userIdString, 10); // Use a base 10 para a conversão

  try {
    await deleteUser(userId);

    res.status(204).send();
  } catch (error) {
    new ReturnError(res, error);
    res.status(500).send(error.message);
  }
});

// METODO PUT - alterar usuario (ChatGPT)
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id, 10); // Converte o ID da string para número

  try {
    // Chame a função de atualização de usuário com o ID e os dados atualizados fornecidos no corpo da solicitação
    const updatedUser = await updateUser(userId, req.body);

    if (updatedUser) {
      // Se a atualização for bem-sucedida, retorne os dados do usuário atualizados
      res.status(200).send(updatedUser);
    } else {
      // Se o usuário não for encontrado, retorne um status 404 Not Found
      res.status(404).send({ error: 'Usuário não encontrado.' });
    }
  } catch (error) {
    // Se ocorrer um erro, retorne uma resposta com status 500 ou outro código de erro apropriado
    new ReturnError(res, error);
    res.status(500).send(error.message);
  }
});

export default userRouter;
