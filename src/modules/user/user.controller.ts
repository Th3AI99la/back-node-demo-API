import { Request, Response, Router } from 'express';
import { createUser, getUsers, deleteUser, updateUser, editPassword } from './user.service';
import { UserInsertDTO } from './dtos/user-insert.dto';
import { ReturnError } from '@exceptions/dtos/return-error.dto';
import { NotFoundException } from '@exceptions/not-found-exception';
import { authMiddleware } from '@middlewares/auth.middleware';
import { authAdminMiddleware } from '@middlewares/auth-admin.middleware';
//import { UserModel } from './user.model';
import { UserEditPasswordDTO } from './dtos/user-edit-Password.dto';

// FUNÇÃO METODO POST - criar usuario (APENAS A FUNÇÃO)
const createUserController = async (
  req: Request<undefined, undefined, UserInsertDTO>,
  res: Response,
): Promise<void> => {
  const user = await createUser(req.body);

  res.send(user);
};

// FUNÇÃO METODO GET - listar usuarios (APENAS A FUNÇÃO)

const getUsersController = async (req: Request, res: Response): Promise<void> => {
  const users = await getUsers().catch((error) => {
    // quando buscar e não retornar nenhum valor, ele exibe o 204 - NotFoundException
    if (error instanceof NotFoundException) {
      res.status(204);
    } else {
      throw new Error(error);
    }
  });
  res.send(users);
};

// FUNÇÃO DELETE - deletar usuario (ChatGPT) (APENAS A FUNÇÃO)

const deleteUsersController = async (req: Request, res: Response): Promise<void> => {
  const userIdString = req.params.id;

  const userId = parseInt(userIdString, 10); // Use a base 10 para a conversão

  try {
    await deleteUser(userId);

    res.status(204).send();
  } catch (error) {
    new ReturnError(res, error);
    res.status(500).send(error.message);
  }
};

// FUNÇÃO METODO PUT - alterar usuario (ChatGPT) (APENAS A FUNÇÃO)

const putUsersController = async (req: Request, res: Response): Promise<void> => {
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
};
const editPasswordController = async (
  req: Request<undefined, undefined, UserEditPasswordDTO>,
  res: Response,
): Promise<void> => {
  const user = await editPassword(48, req.body).catch((error) => {
    new ReturnError(res, error);
  });

  res.send(user);
};

// ROTAS
const userRouter = Router();
const router = Router();

// ENDERENÇO
userRouter.use('/user', router);

// ROTAS = POST, USE , GET , PATCH, DELETE e PUT

router.post('/', createUserController);
router.use(authMiddleware);
router.patch('/', editPasswordController);
router.use(authAdminMiddleware);
router.get('/', getUsersController);
router.delete('/:id', deleteUsersController);
router.put('/:id', putUsersController);

// EXPORTAÇÃO
export default userRouter;
