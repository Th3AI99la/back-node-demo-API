// Importar Express
import express from 'express';
import { userRouter } from './modules/user/user.controller.js';
import { productRouter } from './modules/products/product.controller.js';

//App
const app = express();

// Rotas

app.use(userRouter);
app.use(productRouter);

// Servidor
app.listen(8080, function () {
  console.log('Servidor rodando !');
});
