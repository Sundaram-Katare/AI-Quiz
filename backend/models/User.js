const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  totalQuizzes: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 0 },
  scores: [{ type: Number }],
  createdAt: { type: Date, default: Date.now }
}, { collection: 'user' });

module.exports = mongoose.model('User', UserSchema);