const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  characterName: { type: String, required: true },
  size: { type: String, required: true },
  fileName: { type: String, required: true }, // Nome do arquivo da textura
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Character', CharacterSchema);
