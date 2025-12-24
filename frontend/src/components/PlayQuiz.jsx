// filepath: d:\Visual Code\Full - 2\AI Quiz\frontend\src\components\PlayQuiz.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const PlayQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get(`/quiz/${id}`);
        setQuiz(res.data);
        setAnswers(new Array(res.data.questions.length).fill(''));
      } catch (err) {
        setError('Failed to load quiz');
      }
      setLoading(false);
    };
    fetchQuiz();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/quiz/submit', { quizId: id, answers });
      setScore(res.data);
    } catch (err) {
      setError('Failed to submit');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      {score ? (
        <div>
          <h2>Score: {score.score}/{score.totalQuestions} ({score.percentage}%)</h2>
          <button className="btn" onClick={() => navigate('/create-quiz')}>Create New Quiz</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>{quiz.topic} - {quiz.difficulty}</h2>
          {quiz.questions.map((q, i) => (
            <div key={i} className="question">
              <p>{q.question}</p>
              <div className="options">
                {q.options.map((opt, j) => (
                  <label key={j}>
                    <input
                      type="radio"
                      name={`q${i}`}
                      value={opt}
                      checked={answers[i] === opt}
                      onChange={() => {
                        const newAns = [...answers];
                        newAns[i] = opt;
                        setAnswers(newAns);
                      }}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button type="submit" className="btn">Submit</button>
        </form>
      )}
    </div>
  );
};

export default PlayQuiz;