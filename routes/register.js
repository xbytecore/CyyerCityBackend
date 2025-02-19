const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Rota de registro
router.post('/', async (req, res) => {
  const { email, password, nickname, skins } = req.body; // Inclui o campo skins

  if (!email || !password || !nickname) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Verifica se o email já está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já está em uso.' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário com as skins (se fornecidas)
    const newUser = new User({
      email,
      password: hashedPassword,
      nickname,
      skins: skins || [] // Adiciona as skins, ou um array vazio por padrão
    });

    await newUser.save();
    return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
    return res.status(500).json({ message: 'Erro interno do servidor. Tente novamente mais tarde.' });
  }
});

module.exports = router;
