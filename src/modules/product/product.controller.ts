import { Request, Response, Router } from 'express';

const productRouter = Router();

const router = Router();

productRouter.use('/product', router);

router.get('/', function (req: Request, res: Response): void {
  res.send('SEU PRODUTINHO ');
});

export default productRouter;
