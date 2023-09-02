import { Router } from 'express';
import { createUser, getUsers } from './user.service';

const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

// buscando usuario
router.get('/', async (req, res) => {
  const users = await getUsers();

  res.send(users);
});

// criando usuario
router.post('/', async (req, res) => {
  const user= await createUser(req.body);
  res.send(user);
});

export default userRouter;
