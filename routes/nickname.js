const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Rota para obter o nickname do usuário
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    return res.status(200).json({ nickname: user.nickname });
  } catch (err) {
    console.error('Erro ao obter nickname:', err);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

module.exports = router;
