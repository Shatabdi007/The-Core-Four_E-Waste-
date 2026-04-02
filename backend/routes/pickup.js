// routes/pickup.js (COMPLETE)
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Booking = require("../models/Booking");
const RepairPassport = require("../models/RepairPassport");

// configure transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/book", async (req, res) => {
  try {
    const {
      email,
      address,
      phone,
      deviceType,
      items,
      condition,
      date,
      time,
      pickupType = "repair", // default to repair
    } = req.body;

    // DEBUG: log what we received
    console.log("📦 Pickup request received:", { pickupType, email, items });

    if (!email || !address || !phone) {
      return res.status(400).json({ message: "Email, address and phone required" });
    }

    // save booking
    const booking = await Booking.create({
      email,
      address,
      phone,
      deviceType,
      items,
      condition,
      date,
      time,
      pickupType,
    });

    console.log("✅ Booking saved with pickupType:", pickupType);

    // update RepairPassport
    await RepairPassport.findOneAndUpdate(
      { email },
      {
        $setOnInsert: { credits: 0 },
        $push: {
          history: {
            deviceName: items,
            deviceType,
            event: pickupType === "recycle" ? "E‑waste Pickup" : "Repair Pickup",
            pickupType,
            bookingId: booking._id,
            cost: 0,
            notes: ${condition} | ${address},
            date: new Date(),
          },
        },
      },
      { upsert: true, new: true }
    );

    // DECIDE EMAIL CONTENT BASED ON pickupType
    let subject, text, html;

    if (pickupType === "recycle") {
      // RECYCLE EMAIL
      subject = "🌿 SudhaarSetu – E‑waste pickup confirmed";
      text = `Hi,

Thank you for scheduling an e‑waste pickup with SudhaarSetu.
Our partner will collect the following items for safe recycling:

Items: ${items}
Device type: ${deviceType || "-"}
Condition: ${condition}
Pickup address: ${address}
Pickup date & time: ${date} at ${time}

By recycling with us, you help reduce e‑waste and recover valuable materials responsibly.

Your eco‑impact: +20 Repair Credits 🌿

– SudhaarSetu Team`;

      html = `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #4caf50;">🌿 E‑waste pickup confirmed</h2>
          <p>Thank you for choosing <strong>SudhaarSetu</strong> to recycle your old electronics responsibly.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #e8f5e9;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Items:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${items}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Device type:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${deviceType || "-"}</td>
            </tr>
            <tr style="background: #e8f5e9;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Condition:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${condition}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Pickup address:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${address}</td>
            </tr>
            <tr style="background: #e8f5e9;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Date & time:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${date} at ${time}</td>
            </tr>
          </table>
          <p style="margin-top: 16px; color: #4caf50;"><strong>You've earned +20 Repair Credits for recycling! ✅</strong></p>
          <p style="color: #666; font-size: 12px;">Best regards,<br/>SudhaarSetu – Making repairs accessible & eco‑friendly</p>
        </div>
      `;
    } else {
      // REPAIR EMAIL (default)
      subject = "🛠 SudhaarSetu – Repair pickup booked";
      text = `Hi,

Your repair pickup has been booked with SudhaarSetu.

Device type: ${deviceType || "-"}
Issue / items: ${items}
Condition: ${condition}
Pickup address: ${address}
Pickup date & time: ${date} at ${time}

Our technician/partner will contact you before arriving to confirm the slot.

– SudhaarSetu Team`;

      html = `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #42a5f5;">🛠 Repair pickup booked</h2>
          <p>Your device pickup is confirmed with <strong>SudhaarSetu</strong>.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #e3f2fd;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Device type:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${deviceType || "-"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Issue / items:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${items}</td>
            </tr>
            <tr style="background: #e3f2fd;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Condition:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${condition}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Pickup address:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${address}</td>
            </tr>
            <tr style="background: #e3f2fd;">
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Date & time:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${date} at ${time}</td>
            </tr>
          </table>
          <p style="margin-top: 16px; color: #42a5f5;"><strong>Our technician will contact you soon! ✅</strong></p>
          <p style="color: #666; font-size: 12px;">Best regards,<br/>SudhaarSetu – Making repairs accessible & affordable</p>
        </div>
      `;
    }

    console.log("📧 Sending email with subject:", subject);

    // send mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text,
      html,
    });

    res.json({ success: true, message: "Pickup booked and email sent" });
  } catch (err) {
    console.error("❌ Pickup error:", err);
    res.status(500).json({ message: "Server error while booking pickup" });
  }
});

module.exports = router;