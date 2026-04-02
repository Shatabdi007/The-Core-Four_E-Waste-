import React from "react";

export default function Header({ onNavigate, user, onLogout }) {
  return (
    <header style={styles.wrap}>
      <div style={styles.brand}>SudhaarSetu</div>

      <nav style={styles.nav}>
        <button onClick={() => onNavigate("home")} style={styles.link}>Home</button>
        <button onClick={() => onNavigate("estimator")}>Estimator</button>
        
        <button onClick={() => onNavigate("passport")} style={styles.link}>Repair Passport</button>
        <button onClick={() => onNavigate("locator")} style={styles.link}>Locator</button>
        <button onClick={() => onNavigate("booking")} style={styles.link}>Book Pickup</button>
       
        
      </nav>

      <div style={styles.right}>
        {user ? (
          <>
            <span style={{ marginRight: 10 }}>Hi, {user.username}</span>
            <button onClick={onLogout} style={styles.link}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => onNavigate("login")} style={styles.link}>Login</button>
            <button onClick={() => onNavigate("signup")} style={styles.link}>Sign Up</button>
          </>
        )}
      </div>
    </header>
  );
}

const styles = {
  wrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 22px",
    background: "#12202b",
    color: "white",
  },
  brand: {
    fontWeight: "700",
    fontSize: 20,
  },
  nav: {
    display: "flex",
    gap: 8,
  },
  link: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "white",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
  },
  right: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
};
