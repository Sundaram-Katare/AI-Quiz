const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, required: true },
  questions: [{ 
    question: String,
    options: [String],
    correctAnswer: String
  }],
  score: { type: Number, default: null },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'quiz' });

module.exports = mongoose.model('Quiz', QuizSchema);