import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* -------------------- COMPONENTS -------------------- */
import Header from "./components/Header";
import SudhaarBot from "./components/SudhaarBot";

import RepairEstimator from "./components/RepairEstimator";
import RepairHub from "./components/RepairHub";
import RepairPassport from "./components/RepairPassport";
import AddressPicker from "./components/AddressPicker";
import Booking from "./components/Booking";

import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";

/* -------------------- PAGES -------------------- */
import RepairCenters from "./components/RepairCenters";

/* -------------------- PICKUP FORM -------------------- */
function PickupForm({ user }) {
  const [formData, setFormData] = useState({
    email: user?.email || "",
    address: "",
    phone: "",
    deviceType: "",
    items: "",
    condition: "",
    date: "",
    time: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/pickup/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Pickup booked successfully!");
        setFormData({
          ...formData,
          address: "",
          phone: "",
          deviceType: "",
          items: "",
          condition: "",
          date: "",
          time: ""
        });
      } else {
        setError(data.message || "Booking failed");
      }
    } catch (err) {
      setError("Backend not running on port 5000");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, flexDirection: "column" }}>
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="address" placeholder="Address" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} required />
      <input name="deviceType" placeholder="Device Type" onChange={handleChange} />
      <input name="items" placeholder="Items" onChange={handleChange} />
      <input name="condition" placeholder="Condition" onChange={handleChange} />
      <input type="date" name="date" onChange={handleChange} />
      <input type="time" name="time" onChange={handleChange} />
      <button type="submit" disabled={loading}>
        {loading ? "Booking..." : "Book Pickup"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

/* -------------------- MAIN APP -------------------- */
export default function App() {
  const [page, setPage] = useState("login");

  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("sudhaar_user");
    return raw ? JSON.parse(raw) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("sudhaar_user", JSON.stringify(userData));
    setPage("home");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("sudhaar_user");
    setPage("login");
  };

  /* -------- PAGE RENDERER (NON-ROUTER) -------- */
  const renderPage = () => {
    switch (page) {
      case "login":
        return <Login onLogin={handleLogin} onNavigate={setPage} />;

      case "signup":
        return <Signup onSignup={handleLogin} onNavigate={setPage} />;

      case "forgot":
        return <ForgotPassword onNavigate={setPage} />;

      case "home":
        return <Home onNavigate={setPage} user={user} />;

      case "estimator":
        return <RepairEstimator />;

      case "passport":
        return <RepairPassport user={user} />;

      case "locator":
        return <AddressPicker />;

      case "booking":
        return <Booking user={user} />;

      case "pickup":
        return <PickupForm user={user} />;

      default:
        return <Login onLogin={handleLogin} onNavigate={setPage} />;
    }
  };

  return (
    <BrowserRouter>
      <Header onNavigate={setPage} user={user} onLogout={handleLogout} />

      <main className="container" style={{ padding: "20px" }}>
        <Routes>
          {/* 🔥 ROUTER PAGE */}
          <Route path="/repair-centers" element={<RepairCenters />} />

          {/* 🔥 ALL OTHER PAGES */}
          <Route path="*" element={renderPage()} />
        </Routes>
      </main>

      <SudhaarBot />
    </BrowserRouter>
  );
}