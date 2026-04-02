import React, { useState } from "react";

export default function Login({ onLogin, onNavigate }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Enter both username and password");
      return;
    }

    // Simulated login
    const userData = { username };
    onLogin(userData);     // App.jsx will redirect to home
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sudhaar Setu Login</h2>

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Username</label>
          <input
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email or username"
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          {/* Forgot Password */}
          <div style={{ marginTop: 8 }}>
            <button
              type="button"
              onClick={() => onNavigate("forgot")}
              style={styles.textButton}
            >
              Forgot Password?
            </button>
          </div>

          <button type="submit" style={styles.submit}>Sign In</button>
        </form>

        {/* Sign Up Link */}
        <div style={{ marginTop: 12, textAlign: "center" }}>
          <span>Don't have an account? </span>
          <button
            style={styles.linkish}
            onClick={() => onNavigate("signup")}
          >
            Create one
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- STYLES ----------
const styles = {
  container: {
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    width: 380,
    padding: 28,
    borderRadius: 10,
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    background: "#fff"
  },
  title: { textAlign: "center", marginBottom: 16 },
  label: { display: "block", marginTop: 8, fontSize: 14 },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 6,
    borderRadius: 6,
    border: "1px solid #ddd"
  },
  submit: {
    width: "100%",
    padding: 12,
    marginTop: 18,
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  },
  textButton: {
    background: "transparent",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    padding: 0
  },
  linkish: {
    background: "transparent",
    border: "none",
    color: "#007bff",
    cursor: "pointer"
  }
};
