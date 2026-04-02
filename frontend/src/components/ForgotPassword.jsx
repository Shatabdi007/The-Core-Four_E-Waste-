import React, { useState } from "react";

export default function ForgotPassword({ onNavigate }) {
  const [email, setEmail] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Enter your email");
      return;
    }

    // Simulate sending reset email
    alert(`Password reset link sent to ${email} (simulated)`);
    onNavigate && onNavigate("login");
  };

  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 420, padding: 24, borderRadius: 10, background: "#fff", boxShadow: "0 6px 20px rgba(0,0,0,0.06)" }}>
        <h3>Forgot Password</h3>
        <p>Enter your email and we'll send password reset instructions.</p>

        <form onSubmit={handleSend}>
          <input style={{ width: "100%", padding: 10, marginTop: 8, borderRadius: 6, border: "1px solid #ddd" }} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
          <button style={{ marginTop: 12, width: "100%", padding: 12, background: "#007bff", color: "white", border: "none", borderRadius: 6 }}>Send Reset Link</button>
        </form>

        <div style={{ marginTop: 12, textAlign: "center" }}>
          <button onClick={() => onNavigate && onNavigate("login")} style={{ background: "transparent", border: "none", color: "#007bff", cursor: "pointer" }}>Back to Login</button>
        </div>
      </div>
    </div>
  );
}
