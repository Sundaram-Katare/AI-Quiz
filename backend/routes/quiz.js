const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const auth = require('../middleware/auth');
const Quiz = require('../models/Quiz');
const User = require('../models/User');
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate quiz
router.post('/generate', auth, async (req, res) => {
  const { topic, difficulty, numQuestions } = req.body;
  if (numQuestions < 1 || numQuestions > 20) return res.status(400).json({ msg: 'Invalid number of questions' });

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = `Generate ${numQuestions} ${difficulty} level quiz questions based on current Affairs.
    Focus on Indian and global current affairs for government/competitive exams.
    Create tricky, exam-style MCQs with close options.
    Return JSON only: {"questions": [{"question": "text", "options": ["A", "B", "C", "D"], "correctAnswer": "A"}]}`;

    const result = await model.generateContent(prompt);
    let content = result.response.text().replace(/^```json\s*/, '').replace(/\s*```$/, '');
    const quizData = JSON.parse(content);

    const quiz = new Quiz({ userId: req.user.id, topic, difficulty, questions: quizData.questions });
    await quiz.save();

    res.json({ quizId: quiz._id, questions: quiz.questions });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get quiz by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz || quiz.userId.toString() !== req.user.id) return res.status(404).json({ msg: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Submit quiz
router.post('/submit', auth, async (req, res) => {
  const { quizId, answers } = req.body;
  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz || quiz.userId.toString() !== req.user.id) return res.status(404).json({ msg: 'Quiz not found' });

    let score = 0;
    answers.forEach((ans, i) => {
      if (ans === quiz.questions[i].correctAnswer) score++;
    });
    const percentage = Math.round((score / quiz.questions.length) * 100);

    quiz.score = percentage;
    await quiz.save();

    await User.findByIdAndUpdate(req.user.id, {
      $inc: { totalQuizzes: 1, totalQuestions: quiz.questions.length },
      $push: { scores: percentage }
    });

    res.json({ score, percentage, totalQuestions: quiz.questions.length });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;