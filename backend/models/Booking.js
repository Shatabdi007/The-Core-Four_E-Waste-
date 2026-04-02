const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    email: String,
    address: String,
    phone: String,
    deviceType: String,
    items: String,
    condition: String,
    date: String,
    time: String,
    pickupType: {
      type: String,
      enum: ["repair", "recycle"],
      default: "repair",
    },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', BookingSchema);