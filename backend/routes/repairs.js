const express = require("express");
const router = express.Router();

router.post("/estimate", (req, res) => {
  const { device, usage, severity } = req.body;

  // Simple mock estimation logic
  let basePrice = 500;
  if (severity === "low") basePrice = 300;
  if (severity === "medium") basePrice = 600;
  if (severity === "high") basePrice = 1000;

  if (usage === "everyday") basePrice += 200;
  if (device.toLowerCase() === "fan") basePrice += 50;

  res.json({ estimatedCost: basePrice });
});

module.exports = router;
