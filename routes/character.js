const express = require('express');
const Character = require('../models/Character');
const User = require('../models/User');

const router = express.Router();

// Rota para salvar o personagem
router.post('/', async (req, res) => {
  const { userId, characterName, size, fileName } = req.body;

  // Verifica se o usuário existe
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ message: 'Usuário não encontrado.' });
  }

  // Cria o novo personagem
  const newCharacter = new Character({
    userId: user._id,
    characterName,
    size,
    fileName
  });

  try {
    await newCharacter.save();
    return res.status(201).json({ message: 'Personagem salvo com sucesso!', character: newCharacter });
  } catch (err) {
    console.error('Erro ao salvar personagem:', err);
    return res.status(500).json({ message: 'Erro interno do servidor. Tente novamente mais tarde.' });
  }
});



// Rota para obter o personagem do usuário
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const characters = await Character.find({ userId });
      return res.status(200).json(characters);
    } catch (err) {
      console.error('Erro ao carregar personagens:', err);
      return res.status(500).json({ message: 'Erro ao carregar personagens.' });
    }
  });

  
module.exports = router;
