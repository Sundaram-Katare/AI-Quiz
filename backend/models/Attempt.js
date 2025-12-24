const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  topic: String,
  difficulty: String,
  score: Number,
  totalQuestions: Number,
  percentage: Number,
  answers: [{
    questionIndex: Number,
    selectedOption: Number,
    isCorrect: Boolean
  }],
  completedAt: { type: Date, default: Date.now }
}, { collection: 'attempt' });

module.exports = mongoose.model('Attempt', attemptSchema);
