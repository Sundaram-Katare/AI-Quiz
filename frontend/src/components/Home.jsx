import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "80px 24px",
        boxSizing: "border-box",
      }}
    >
      
      <section
        style={{
          maxWidth: "1100px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          marginBottom: "80px",
        }}
      >
        <h1
          style={{
            fontSize: "44px",
            fontWeight: "700",
            color: "#111827",
            marginBottom: "16px",
            lineHeight: "1.2",
          }}
        >
          AI-Powered Quiz Generator
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#4b5563",
            maxWidth: "700px",
            marginBottom: "32px",
            lineHeight: "1.6",
          }}
        >
          Instantly generate smart quizzes on Current Affairs using AI.  
          Track your performance, improve faster, and learn smarter.
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link to="/create-quiz">
            <button
              style={{
                padding: "14px 28px",
                backgroundColor: "#111827",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Create Quiz
            </button>
          </Link>

          <Link to="/profile">
            <button
              style={{
                padding: "14px 28px",
                backgroundColor: "#ffffff",
                color: "#111827",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              View Profile
            </button>
          </Link>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1100px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
          marginBottom: "80px",
        }}
      >
        {[
          {
            title: "AI-Generated Quizzes",
            desc: "Generate high-quality quizzes instantly using Gemini AI.",
          },
          {
            title: "Custom Difficulty",
            desc: "Choose difficulty levels that match your learning pace.",
          },
          {
            title: "Score Tracking",
            desc: "Track your quiz scores and monitor your progress over time.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#ffffff",
              padding: "32px",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#111827",
                marginBottom: "12px",
              }}
            >
              {feature.title}
            </h3>
            <p
              style={{
                fontSize: "15px",
                color: "#4b5563",
                lineHeight: "1.6",
              }}
            >
              {feature.desc}
            </p>
          </div>
        ))}
      </section>

      <section
        style={{
          maxWidth: "900px",
          width: "100%",
          backgroundColor: "#111827",
          color: "#ffffff",
          padding: "48px 32px",
          borderRadius: "16px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "700",
            marginBottom: "16px",
          }}
        >
          Ready to test your knowledge?
        </h2>

        <p
          style={{
            fontSize: "16px",
            color: "#d1d5db",
            marginBottom: "28px",
          }}
        >
          Create your first AI-powered quiz and start learning today.
        </p>

        <Link to="/create-quiz">
          <button
            style={{
              padding: "14px 30px",
              backgroundColor: "#ffffff",
              color: "#111827",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Get Started
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
