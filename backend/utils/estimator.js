// utils/estimator.js
const express = require("express");
const router = express.Router();

// Sample estimator logic
router.post("/", (req, res) => {
  const { device, issue } = req.body;

  if (!device || !issue) {
    return res.status(400).json({ error: "Device and issue required" });
  }

  // Dummy price logic – replace with real
  const price = Math.floor(Math.random() * 500) + 300;

  res.json({
    estimatedPrice: price,
    message: "Estimate generated successfully"
  });
});

module.exports = router;
