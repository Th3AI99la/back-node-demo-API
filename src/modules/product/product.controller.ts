import { Request, Response, Router } from 'express';

// FUNÇÃO METODO GET - listar usuarios (APENAS A FUNÇÃO)
const getproductController = (req: Request, res: Response): void => {
  res.send('SEU PRODUTINHO ');
};

// ROTAS
const productRouter = Router();
const router = Router();

// ENDERENÇO
productRouter.use('/product', router);

// ROTA METODO GET
router.get('/', getproductController);

// EXPORTAÇÃO
export default productRouter;
