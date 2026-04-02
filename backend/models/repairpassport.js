const mongoose = require("mongoose");

const passportSchema = new mongoose.Schema({
  email: { type: String, required: true },

  history: [
    {
      deviceName: String,
      deviceType: String,
      event: String,
      cost: Number,
      notes: String,
      date: Date
    }
  ],

  credits: { type: Number, default: 0 }
});

module.exports = mongoose.model("RepairPassport", passportSchema);