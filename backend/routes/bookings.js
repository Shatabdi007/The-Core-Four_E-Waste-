// routes/bookings.js
import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
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
      pickupType, // "repair" or "recycle"
      notes,
    } = req.body;

    if (!email || !address || !phone) {
      return res.status(400).json({ message: "Email, address and phone required" });
    }

    // 1) Save the booking
    const booking = new Booking({
      email,
      address,
      phone,
      deviceType,
      items,
      condition,
      date,
      time,
      pickupType,
      notes,
    });

    await booking.save();
    res.json({
      success: true,
      message: "Booking request received",
      data: {
        name,
        device,
        issue,
        address,
        phone,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

export default router; 
