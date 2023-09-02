// Importações
import express from 'express';
import { routerLoader } from './routerLoader.js';

//App
const app = express();

// Conversão para Json
app.use(express.json());

// Rotas
routerLoader(app);

// Servidor
app.listen(8080, function () {
  console.log('Servidor rodando ! 8080');
});
