import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const PlayQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get(`/quiz/${id}`);
        setQuiz(res.data);
        setAnswers(new Array(res.data.questions.length).fill(""));
      } catch (err) {
        setError("Failed to load quiz");
      }
      setLoading(false);
    };
    fetchQuiz();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/quiz/submit", {
        quizId: id,
        answers,
      });
      setScore(res.data);
    } catch (err) {
      setError("Failed to submit quiz");
    }
  };

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6b7280",
          fontSize: "16px",
        }}
      >
        Loading quiz...
      </div>
    );

  if (error)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#991b1b",
          fontSize: "16px",
        }}
      >
        {error}
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "40px 24px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          minWidth: "100vw",
          margin: "0 auto",
        }}
      >
        {score ? (
          /* Result Screen */
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "40px",
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#111827",
                marginBottom: "12px",
              }}
            >
              Quiz Completed 🎉
            </h2>

            <p
              style={{
                fontSize: "18px",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              Score:{" "}
              <strong>
                {score.score}/{score.totalQuestions}
              </strong>
            </p>

            <p
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#111827",
                marginBottom: "28px",
              }}
            >
              {score.percentage}%
            </p>

            <button
              onClick={() => navigate("/create-quiz")}
              style={{
                padding: "14px 28px",
                backgroundColor: "#111827",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Create New Quiz
            </button>
          </div>
        ) : (
          /* Quiz Form */
          <form onSubmit={handleSubmit}>
            {/* Quiz Header */}
            <div
              style={{
                marginBottom: "32px",
              }}
            >
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#111827",
                  marginBottom: "6px",
                }}
              >
                {quiz.topic}
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  textTransform: "capitalize",
                }}
              >
                Difficulty: {quiz.difficulty}
              </p>
            </div>

            {/* Questions */}
            {quiz.questions.map((q, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#ffffff",
                  padding: "24px",
                  borderRadius: "14px",
                  border: "1px solid #e5e7eb",
                  marginBottom: "20px",
                }}
              >
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "14px",
                  }}
                >
                  {i + 1}. {q.question}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {q.options.map((opt, j) => (
                    <label
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #d1d5db",
                        cursor: "pointer",
                        fontSize: "14px",
                        color: "#374151",
                      }}
                    >
                      <input
                        type="checkbox"
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

            {/* Submit */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "16px",
                backgroundColor: "#111827",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Submit Quiz
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PlayQuiz;
