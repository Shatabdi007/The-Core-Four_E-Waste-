// frontend/src/components/Booking.jsx
import axios from "axios";
import React, { useState } from "react";
import "./AddressPicker.css";

const Booking = ({ user }) => {
  const [form, setForm] = useState({
    email: user?.email || "",
    address: "",
    phone: "",
    deviceType: "",
    items: "",
    condition: "",
    date: "",
    time: "",
    pickupType: "repair", // "repair" | "recycle"
  });

  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1) Call backend API
      await axios.post("http://localhost:5000/api/pickup/book", {
        email: form.email,
        address: form.address,
        phone: form.phone,
        deviceType: form.deviceType,
        items: form.items,
        condition: form.condition,
        date: form.date,
        time: form.time,
        pickupType: form.pickupType,
      });

      // 2) Build passport entry ✅ FIXED
      const passportEntry = {
        deviceName: form.items,
        deviceType: form.deviceType,
        event:
          form.pickupType === "recycle"
            ? "E-waste Pickup"
            : "Repair Pickup",
        cost: 0,
        notes: `${form.condition} | ${form.address}`,
        date: new Date().toISOString(),
      };

      // 3) Save history in localStorage
      const history =
        JSON.parse(localStorage.getItem("repair_passport")) || [];
      const updatedHistory = [passportEntry, ...history];
      localStorage.setItem(
        "repair_passport",
        JSON.stringify(updatedHistory)
      );

      // 4) Update credits in localStorage
      const credits =
        Number(localStorage.getItem("repair_credits")) || 0;
      const add = form.pickupType === "recycle" ? 20 : 10;
      localStorage.setItem("repair_credits", credits + add);

      // 5) UX: popup + reset form (keep email)
      setShowPopup(true);
      setForm((prev) => ({
        ...prev,
        address: "",
        phone: "",
        deviceType: "",
        items: "",
        condition: "",
        date: "",
        time: "",
        pickupType: "repair",
      }));

      setTimeout(() => setShowPopup(false), 3000);
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      alert("Pickup booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-container">
      <h2>Pickup Booking</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="email"
          placeholder="Email (to receive confirmation)"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          placeholder="Pickup Address"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          placeholder="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <select
          name="deviceType"
          value={form.deviceType}
          onChange={handleChange}
          required
        >
          <option value="">Select Device Type</option>
          <option>Mobile</option>
          <option>Laptop</option>
          <option>TV</option>
          <option>Fan</option>
          <option>Battery</option>
        </select>

        <label style={{ fontSize: "14px", fontWeight: 600 }}>
          Pickup type
          <select
            name="pickupType"
            value={form.pickupType}
            onChange={handleChange}
            style={{ marginTop: "4px", padding: "8px", width: "100%" }}
          >
            <option value="repair">Repair pickup</option>
            <option value="recycle">
              Recycle / e-waste pickup
            </option>
          </select>
        </label>

        <textarea
          placeholder={
            form.pickupType === "recycle"
              ? "Example: dead phone, broken charger, old laptop"
              : "Items / issue (e.g. AC not cooling, cracked screen, etc.)"
          }
          name="items"
          value={form.items}
          onChange={handleChange}
          required
        />

        <select
          name="condition"
          value={form.condition}
          onChange={handleChange}
          required
        >
          <option value="">Condition</option>
          <option>Working</option>
          <option>Broken</option>
          <option>Dead</option>
        </select>

        <div className="date-time-row">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Book Pickup"}
        </button>
      </form>

      {showPopup && (
        <div className="success-popup">
          ✅ Pickup booked! Repair Passport & credits updated 🌿
        </div>
      )}
    </div>
  );
};

export default Booking;
