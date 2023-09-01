import { Router } from 'express';

const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

router.get('/', function (req, res) {
  res.send('Olá, mundo! USER AGORA ');
});

router.get('/:nome', function (req, res) {
  res.send('Meu nome e Thalles ');
});

router.get('/user/:lindo', function (req, res) {
  res.send('Oiie vc e mt lindo ');
});


export default userRouter;