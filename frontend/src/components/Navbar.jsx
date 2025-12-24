import { Link } from "react-router-dom";

const Navbar = ({ logout }) => {
  return (
    <nav
      style={{
        width: "100%",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          fontSize: "20px",
          fontWeight: "600",
          color: "#111827",
          margin: 0,
        }}
      >
        AI Quiz
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#374151",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Home
        </Link>

        <Link
          to="/create-quiz"
          style={{
            textDecoration: "none",
            color: "#374151",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Create Quiz
        </Link>

        <Link
          to="/profile"
          style={{
            textDecoration: "none",
            color: "#374151",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Profile
        </Link>

        <button
          onClick={logout}
          style={{
            padding: "8px 14px",
            backgroundColor: "#111827",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
