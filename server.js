const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/cyyacitydatabase')
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

// Configurações do servidor
const app = express();

// Configuração do CORS para permitir todas as origens
const corsOptions = {
    origin: '*',  // Permitir qualquer origem
    methods: 'GET,POST',  // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization',  // Cabeçalhos permitidos
};

app.use(cors(corsOptions));  // Aplica as configurações de CORS
app.use(express.json());

// Rotas
const registerRoute = require('./routes/register');
app.use('/api/register', registerRoute);

const loginRoute = require('./routes/login');
app.use('/api/login', loginRoute);  // Rota de login

const nicknameRoute = require('./routes/nickname');
app.use('/api/nickname', nicknameRoute);

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
