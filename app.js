// Importar Express
const express = require("express");

//App
const app = express();



// Rotas

app.get("/", function (req, res) {
  res.send("Birulinha 123 ");
});

//Endpoint's

app.get("/user/:nome/sobrenome/:sobrenome", function (req, res) {
  res.send({
    nome: req.params.nome,
    sobrenome: req.params.sobrenome
  });
});

// Servidor
app.listen(8080, function () {
  console.log("Servidor rodando !");
});
