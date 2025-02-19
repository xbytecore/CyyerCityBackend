const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
  skins: { type: [String], default: [] } // Campo para armazenar as skins
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
