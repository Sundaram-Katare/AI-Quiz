import React, { useState, useEffect } from "react";
import api from "../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          minWidth: '100vw',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          color: "#6b7280",
        }}
      >
        Loading profile...
      </div>
    );

  if (error)
    return (
      <div
        style={{
          minHeight: "100vh",
          minWidth: '100vw',
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

  if (!user)
    return (
      <div
        style={{
          minHeight: "100vh",
          minWidth: '100vw',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
        }}
      >
        No user data
      </div>
    );

  const avgScore = user.scores.length
    ? (
        user.scores.reduce((a, b) => a + b, 0) / user.scores.length
      ).toFixed(2)
    : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: '100vw',
        backgroundColor: "#f9fafb",
        padding: "48px 24px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#111827",
            marginBottom: "8px",
          }}
        >
          Profile Overview
        </h2>

        <p
          style={{
            fontSize: "15px",
            color: "#6b7280",
            marginBottom: "32px",
          }}
        >
          Track your quiz activity and performance
        </p>

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "14px",
            padding: "28px",
            border: "1px solid #e5e7eb",
            marginBottom: "32px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              color: "#6b7280",
              marginBottom: "6px",
            }}
          >
            Email
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#111827",
            }}
          >
            {user.email}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "24px",
              borderRadius: "14px",
              border: "1px solid #e5e7eb",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "8px",
              }}
            >
              Total Quizzes Created
            </p>
            <h3
              style={{
                fontSize: "26px",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              {user.totalQuizzes}
            </h3>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "24px",
              borderRadius: "14px",
              border: "1px solid #e5e7eb",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "8px",
              }}
            >
              Questions Attempted
            </p>
            <h3
              style={{
                fontSize: "26px",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              {user.totalQuestions}
            </h3>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "24px",
              borderRadius: "14px",
              border: "1px solid #e5e7eb",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "8px",
              }}
            >
              Latest Score
            </p>
            <h3
              style={{
                fontSize: "26px",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              {user.scores.length
                ? `${user.scores[user.scores.length - 1]}%`
                : "N/A"}
            </h3>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "24px",
              borderRadius: "14px",
              border: "1px solid #e5e7eb",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "8px",
              }}
            >
              Average Score
            </p>
            <h3
              style={{
                fontSize: "26px",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              {avgScore}%
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
