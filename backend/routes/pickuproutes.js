const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const RepairPassport = require("../models/RepairPassport");

// -----------------------
// EMAIL TRANSPORTER
// -----------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER, // Gmail address
    pass: process.env.MAIL_PASS  // Gmail App Password
  }
});

// Verify transporter
transporter.verify((error) => {
  if (error) {
    console.error("Email transporter verification failed:", error);
  } else {
    console.log("Email transporter ready");
  }
});

// -----------------------
// BOOK PICKUP
// -----------------------
router.post("/pickup/book", async (req, res) => {
  try {
    const {
      email,
      phone,
      address,
      deviceType,
      items,
      condition,
      date,
      time
    } = req.body;

    // Find or create Repair Passport
    let passport = await RepairPassport.findOne({ email });

    if (!passport) {
      passport = new RepairPassport({
        email,
        credits: 0,
        history: []
      });
    }

    // Add history entry ✅ FIXED
    passport.history.unshift({
      deviceName: items,
      deviceType,
      event: "E-Waste Pickup Booked",
      cost: 0,
      notes: `${condition} | ${address}`,
      date: new Date()
    });

    // Add credits
    passport.credits += 20;

    await passport.save();

    // -----------------------
    // USER EMAIL
    // -----------------------
    const userMailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "E-Waste Pickup Booking Confirmation",
      html: `
        <h2>Your E-Waste Pickup is Booked!</h2>
        <p><b>Address:</b> ${address}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Device Type:</b> ${deviceType}</p>
        <p><b>Items:</b> ${items}</p>
        <p><b>Condition:</b> ${condition}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Time:</b> ${time}</p>
        <br/>
        <p>You earned <b>20 repair credits</b>.</p>
        <p>Total Credits: <b>${passport.credits}</b></p>
      `
    };

    // -----------------------
    // ADMIN EMAIL
    // -----------------------
    const adminMailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      subject: "New E-Waste Pickup Request",
      html: `
        <h3>New Pickup Request</h3>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Address:</b> ${address}</p>
        <p><b>Device:</b> ${deviceType}</p>
        <p><b>Items:</b> ${items}</p>
        <p><b>Condition:</b> ${condition}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Time:</b> ${time}</p>
      `
    };

    // Send emails
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    res.status(200).json({
      message: "Pickup booked successfully",
      credits: passport.credits
    });

  } catch (err) {
    console.error("Pickup booking error:", err);
    res.status(500).json({ message: "Pickup booking failed" });
  }
});

module.exports = router;
