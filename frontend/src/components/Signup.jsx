import React, { useState } from "react";

export default function Signup({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert("Account created successfully!");
    onNavigate("login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <form onSubmit={handleSignup}>
          {/* Email */}
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Confirm Password */}
          <label style={styles.label}>Confirm Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" style={styles.signupBtn}>
            Create Account
          </button>
        </form>

        {/* Back to Login */}
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <button
            onClick={() => onNavigate("login")}
            style={styles.textButton}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------- STYLES --------------------
const styles = {
  container: {
    minHeight: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0d1326",
  },
  card: {
    width: 450,
    padding: 30,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    display: "block",
    marginTop: 10,
    fontSize: 14,
  },
  input: {
    width: "100%",
    padding: 12,
    marginTop: 6,
    border: "1px solid #ddd",
    borderRadius: 6,
    fontSize: 15,
  },
  signupBtn: {
    width: "100%",
    padding: 12,
    marginTop: 20,
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 16,
  },
  textButton: {
    background: "transparent",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    fontSize: 15,
    textDecoration: "underline",
  },
};
