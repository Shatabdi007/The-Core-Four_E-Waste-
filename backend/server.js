// =======================
// REQUIRED IMPORTS (ESM)
// =======================
import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

// =======================
// ROUTE IMPORTS
// =======================
import placesRoutes from "./routes/places.js";
import authRoutes from "./routes/auth.js";
import devicesRoutes from "./routes/devices.js";
import shopsRoutes from "./routes/shops.js";
import repairsRoutes from "./routes/repairs.js";
import bookingsRoutes from "./routes/bookings.js";
import estimateRoutes from "./utils/estimator.js";
import pickupRoutes from "./routes/pickupRoutes.js";
import passportRoutes from "./routes/passport.js";
import repairCentersRoute from "./routes/repairCenters.js";

// =======================

const app = express();

// =======================
// MIDDLEWARE
// =======================
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json());

// =======================
// ROUTES
// =======================
app.use("/api/places", placesRoutes);
app.use("/api/pickup", pickupRoutes);
app.use("/api/passport", passportRoutes);
app.use("/api/estimate", estimateRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/devices", devicesRoutes);
app.use("/api/shops", shopsRoutes);
app.use("/api/repairs", repairsRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/repair-centers", repairCentersRoute);

// =======================
// MONGODB CONNECTION
// =======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// =======================
// SUDHAAR BOT Q&A DATA
// =======================
const faqs = [
  { q: "hello", a: "Hi 👋 I am Sudhaar Bot. How can I help you today?" },
  { q: "hi", a: "Hello! Ask me about repairs, bookings, pickup or devices." },
  { q: "hey", a: "Hey there! I’m Sudhaar Bot 🤖" },
  { q: "how are you", a: "I’m always online and ready to help!" },

  { q: "what is sudhaarsetu", a: "SudhaarSetu is a platform to estimate repairs, book technicians, track repairs and manage device health." },
  { q: "features", a: "You can estimate repair cost, find repair centers, book service, track repairs, request pickup and store repair history." },

  { q: "book repair", a: "Go to Repair Estimator, select device, issue and click Book Repair." },
  { q: "repair cost", a: "Use Repair Estimator to get an approximate cost instantly." },
  { q: "repair center", a: "After estimation, click Find Repair Centers to see nearby shops." },

  { q: "track repair", a: "Open My Bookings section to track repair progress." },
  { q: "pickup", a: "You can schedule e-waste pickup from Pickup section." },
];

// =======================
// BOT LOGIC
// =======================
function getBestAnswer(question) {
  const text = question.toLowerCase();
  let bestMatch = null;
  let score = 0;

  faqs.forEach((item) => {
    let currentScore = 0;
    item.q.split(" ").forEach((w) => {
      if (text.includes(w)) currentScore++;
    });
    if (currentScore > score) {
      score = currentScore;
      bestMatch = item.a;
    }
  });

  return bestMatch || "Sorry, I didn’t understand that. Please try again.";
}

// =======================
// BOT API
// =======================
app.post("/sudhaar-bot/ask", (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ answer: "Please ask a question." });
  }
  res.json({ answer: getBestAnswer(question) });
});

// =======================
// EMAIL TRANSPORTER
// =======================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// =======================
// PICKUP BOOKING EMAIL (BEAUTIFUL VERSION)
// =======================
app.post("/api/pickup/book", async (req, res) => {
  const data = req.body;

  const userMailOptions = {
    from: `"SudhaarSetu" <${process.env.MAIL_USER}>`,
    to: data.email,
    subject: "E-Waste Pickup Booking Confirmation ♻️",
    html: `
      <div style="font-family: Arial, sans-serif; padding:20px;">
        <h2 style="color:#4CAF50;">Your E-Waste Pickup is Booked! ✅</h2>
        <p>Thank you for contributing to a cleaner environment 🌍</p>
        <hr/>
        <p><b>📍 Address:</b> ${data.address}</p>
        <p><b>📞 Phone:</b> ${data.phone}</p>
        <p><b>💻 Device Type:</b> ${data.deviceType}</p>
        <p><b>📦 Items:</b> ${data.items}</p>
        <p><b>🔍 Condition:</b> ${data.condition}</p>
        <p><b>📅 Date:</b> ${data.date}</p>
        <p><b>⏰ Time:</b> ${data.time}</p>
        <br/>
        <p>🚚 Our team will notify you once the pickup is assigned.</p>
        <p style="margin-top:20px;">— <b>SudhaarSetu Team</b></p>
      </div>
    `,
  };

  const adminMailOptions = {
    from: `"SudhaarSetu Admin" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_USER,
    subject: "📢 New E-Waste Pickup Request",
    html: `
      <h3>New Pickup Request Received</h3>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Address:</b> ${data.address}</p>
      <p><b>Phone:</b> ${data.phone}</p>
      <p><b>Device:</b> ${data.deviceType}</p>
      <p><b>Items:</b> ${data.items}</p>
      <p><b>Condition:</b> ${data.condition}</p>
      <p><b>Date:</b> ${data.date}</p>
      <p><b>Time:</b> ${data.time}</p>
    `,
  };

  try {
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);
    res.json({ message: "Pickup booked & emails sent successfully ✅" });
  } catch (err) {
    console.error("❌ Mail error:", err);
    res.status(500).json({ message: "Mail sending failed" });
  }
});

// =======================
// TEST ROUTE
// =======================
app.get("/", (req, res) => {
  res.json({ ok: true, message: "SudhaarSetu backend running 🚀" });
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
