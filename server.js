const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configurações Iniciais
app.use(cors());
app.use(express.json());

// Rota de Teste (para saber se o servidor está vivo)
app.get('/', (req, res) => res.json({ message: 'API da Biblioteca Pessoal funcionando!' }));

// Conectando os "Mapas" de Rotas
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/authors', require('./routes/authorRoutes'));

// Conexão com o Banco de Dados e Inicialização
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/biblioteca_db';

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log('Conectado ao MongoDB com sucesso!');
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
  });