import { Request, Response, Router } from 'express';
import { createUser, getUsers } from './user.service';
import { UserInsertDTO } from './dtos/user-insert.dto';

const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

// buscando usuario
router.get('/', async (req: Request, res: Response): Promise<void> => {
  const users = await getUsers();

  res.send(users);
});

// criando usuario
router.post(
  '/',
  async (req: Request<undefined, undefined, UserInsertDTO>, res: Response): Promise<void> => {
    const user = await createUser(req.body);
    res.send(user);
  },
);

export default userRouter;
