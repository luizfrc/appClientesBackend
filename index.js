const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração do MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_cad'
});

// Conexão com o banco de dados
db.connect(err => {
    if (err) throw err;
    console.log('MySQL conectado');
});

// 1. Buscar todos os clientes
app.get('/clientes', (req, res) => {
    const sql = `SELECT 
          ID,
          idUsuario,
          Codigo,
          Nome,
          CPF_CNPJ,
          CEP,
          Logradouro,
          Numero,
          Bairro,
          Cidade,
          UF,
          Complemento,
          Fone,
          LimiteCredito,
          DATE_FORMAT(Validade,'%d/%m/%Y') as Validade
        FROM clientes`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// 2. Criar um cliente
app.post('/clientes', (req, res) => {
    const { idUsuario, Codigo, Nome, CPF_CNPJ, CEP, Logradouro, Numero, Bairro, Cidade, UF, Complemento, Fone, LimiteCredito, Validade } = req.body;
    const sql = `INSERT INTO clientes (
        idUsuario,
        Codigo,
        Nome,
        CPF_CNPJ,
        CEP,
        Logradouro,
        Numero,
        Bairro,
        Cidade,
        UF,
        Complemento,
        Fone,
        LimiteCredito,
        Validade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [idUsuario, Codigo, Nome, CPF_CNPJ, CEP, Logradouro, Numero, Bairro, Cidade, UF, Complemento, Fone, LimiteCredito, Validade], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// 3. Atualizar um cliente
app.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { idUsuario, Codigo, Nome, CPF_CNPJ, CEP, Logradouro, Numero, Bairro, Cidade, UF, Complemento, Fone, LimiteCredito, Validade } = req.body;
    const sql = `UPDATE clientes SET idUsuario = ?,
        Codigo = ?,
        Nome = ?,
        CPF_CNPJ = ?,
        CEP = ?,
        Logradouro = ?,
        Numero = ?,
        Bairro = ?,
        Cidade = ?,
        UF = ?,
        Complemento = ?,
        Fone = ?,
        LimiteCredito = ?,
        Validade = ? WHERE ID = ?`;
    db.query(sql, [idUsuario, Codigo, Nome, CPF_CNPJ, CEP, Logradouro, Numero, Bairro, Cidade, UF, Complemento, Fone, LimiteCredito, Validade, id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// 4. Deletar um cliente
app.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM clientes WHERE ID = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Inicializar servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
