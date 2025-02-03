const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Rota de login
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Senha inválida.' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Removido o nickname
      'secrectkey', 
      { expiresIn: '1h' }
    );

    console.log('Token gerado:', token);

    console.log('Nickname enviado na resposta:', user.nickname);
    return res.status(200).json({
      message: 'Login bem-sucedido', 
      token: token,
      userId: user._id,
      nickname: user.nickname // Deve estar aqui
    });
    
    
    
    
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    return res.status(500).json({ message: 'Erro interno do servidor. Tente novamente mais tarde.' });
  }
});

module.exports = router;
