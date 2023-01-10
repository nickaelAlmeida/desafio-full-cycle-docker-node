const express = require('express');
const app = express();
const mysql = require('mysql');
const faker = require('faker');

const conexao = mysql.createConnection({
  host: 'db',
  database: 'desafio',
  user: 'root',
  password: 'root',
});

conexao.connect((erro) => {
  if (!erro) console.log('MySQL Conectado!');
});

conexao.query("CREATE TABLE pessoas (nome VARCHAR(255))", (erro, _) => {
  if (!erro) console.log('Tabela Criada com Sucesso!');
});

app.get('/', (_, res) => {
  conexao.query(`INSERT INTO pessoas (nome) VALUES ('${faker.name.findName()}')`);
  conexao.query("SELECT nome FROM pessoas", (erro, resultado, _) => {
    res.send(`
      <h1>Desafio Full Cycle</h1>
      <ol>${resultado.map(item => `<li>${item.nome}</li>`)}</ol>
    `);
  })
});

app.listen(3333, () => {
  console.log('App OnLine!');
});