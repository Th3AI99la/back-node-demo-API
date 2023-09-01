// Importações
import express from 'express';
/*
import { userRouter } from './modules/user/user.controller.js';
import { productRouter } from './modules/products/product.controller.js';
*/

import { routerLoader } from './routerLoader.js';

//App
const app = express();

// Rotas

routerLoader(app);

// Servidor
app.listen(8080, function () {
  console.log('Servidor rodando ! 8080');
});
