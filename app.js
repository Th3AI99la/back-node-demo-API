// Importar Express
const express = require("express");

//App
const app = express();

// Rotas

app.get("/", function (req, res) {
  res.send("Thalles Henrique Alves de Souza");
});

app.get("/user", function (req, res) {
  res.send({
    nome: "Thalles",
    idade: 22,
  });
});

app.delete("/user", function (req, res) {
  res.send({
    nome: "Thalles DELETADO",
    idade: 22,
  });
});

// Servidor
app.listen(8080, function () {
  console.log("Servidor rodando !");
});
