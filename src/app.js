// Importar Express
import express from 'express';

//App
const app = express();

// Rotas

app.get('/', function (req, res) {
  res.send('Birulinha 123 ');
});

//Endpoint's

app.get('/user/:nome/sobrenome/:sobrenome', function (req, res) {
  res.send({
    nome: req.params.nome,
    sobrenome: req.params.sobrenome,
  });
});

// Servidor
app.listen(3010, function () {
  console.log('Servidor rodando !');
});
