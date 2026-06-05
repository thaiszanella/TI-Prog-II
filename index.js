// index.js servidor Express mínimo
const express = require('express');

// Cria a instância da aplicação Express
const app = express();

const PORTA = process.env.PORT || 3000;

// Middleware para fazer o parse do corpo JSON das requisições
// Sem isso, req.body será undefined em rotas POST/PUT/PATCH
app.use(express.json());

// Rota de teste responde a GET /
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API funcionando',
        versao: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// Inicia o servidor na porta especificada
app.listen(PORTA, () => {
    console.log("Servidor rodando em http://localhost:" + PORTA);
});
