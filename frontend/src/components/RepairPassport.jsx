import React, { useEffect, useState } from "react";
import "./RepairPassport.css";


const RepairPassport = () => {
  const [history, setHistory] = useState([]);
  const [credits, setCredits] = useState(0);
  const [voucher, setVoucher] = useState(null);

  // Load saved data from localStorage
  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("repair_passport")) || [];
    const savedCredits =
      Number(localStorage.getItem("repair_credits")) || 0;
    const savedVoucher =
      JSON.parse(localStorage.getItem("repair_voucher"));

    setHistory(savedHistory);
    setCredits(savedCredits);
    setVoucher(savedVoucher);
  }, []);

  // Redeem credits logic
  const redeemCredits = (cost, reward) => {
    if (credits < cost) {
      alert("Not enough credits 😕");
      return;
    }

    const updatedCredits = credits - cost;
    setCredits(updatedCredits);
    localStorage.setItem("repair_credits", updatedCredits);

    const newVoucher = {
      code: "SS-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      reward,
      date: new Date().toLocaleString(),
    };

    setVoucher(newVoucher);
    localStorage.setItem("repair_voucher", JSON.stringify(newVoucher));
  };

  return (
    <div className="passport-container">
      <h2>Digital Repair Passport</h2>

      {/* 🌱 CREDIT SUMMARY */}
      <div className="credit-card">
        <h3>🌿 Repair Credits</h3>
        <p className="credit-points">{credits} Credits Earned</p>
        <p className="impact">
          You saved approx <b>{(credits * 0.02).toFixed(1)} kg</b> of e-waste ♻
        </p>
      </div>

      {/* 🎁 REDEEM SECTION */}
      <div className="credit-card">
        <h3>🎁 Redeem Your Credits</h3>

        <div className="redeem-row">
          <button onClick={() => redeemCredits(50, "₹100 OFF on Repair")}>
            Redeem 50 → ₹100 OFF
          </button>

          <button onClick={() => redeemCredits(120, "₹250 OFF on Repair")}>
            Redeem 120 → ₹250 OFF
          </button>

          <button onClick={() => redeemCredits(80, "FREE Pickup Voucher")}>
            Redeem 80 → Free Pickup
          </button>
        </div>

        {voucher && (
          <div className="voucher-box">
            <h4>🎉 Your Voucher</h4>
            <p><strong>Code:</strong> {voucher.code}</p>
            <p><strong>Reward:</strong> {voucher.reward}</p>
            <p><strong>Date:</strong> {voucher.date}</p>
          </div>
        )}
      </div>

      {/* 📜 HISTORY */}
      <h3 className="section-title">Repair & Pickup History</h3>

      {history.length === 0 ? (
        <p className="empty">No activity yet.</p>
      ) : (
        history.map((item, index) => (
          <div key={index} className="history-card">
            <p className="row">
              <span className="label">Device:</span>
              <span className="value device">{item.deviceName}</span>
            </p>

            <p className="row">
              <span className="label">Type:</span>
              <span className="value type">{item.deviceType}</span>
            </p>

            <p className="row">
              <span className="label">Event:</span>
              <span className="value event">
                {item.event || item.repairType}
              </span>
            </p>

            <p className="row">
              <span className="label">Cost:</span>
              <span className="value cost">₹{item.cost || item.repairCost}</span>
            </p>

            <p className="row">
              <span className="label">Date:</span>
              <span className="value date">
                {new Date(item.date).toLocaleString()}
              </span>
            </p>

            <p className="row">
              <span className="label">Notes:</span>
              <span className="value notes">{item.notes}</span>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default RepairPassport;
