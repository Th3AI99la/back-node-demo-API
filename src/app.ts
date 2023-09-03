// Importações
import express from 'express';
import { routerLoader } from './routerLoader';

//App
const app = express();

// Conversão para Json
app.use(express.json());

// Rotas
routerLoader(app);

// Servidor
app.listen(8080, function (): void {
  console.log('\nServidor rodando! \nPorta: 8080\n');
});
