const express = require('express');
const auth = require('../middleware/auth');
const Attempt = require('../models/Attempt');
const router = express.Router();

router.get('/attempts', auth, async (req, res) => {
  try {
    const attempts = await Attempt.find({ userId: req.user._id })
      .populate('quizId')
      .sort({ completedAt: -1 })
      .limit(10);
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
