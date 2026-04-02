const express = require("express");
const router = express.Router();
const RepairPassport = require("../models/RepairPassport");

/* GET passport */
router.get("/:email", async (req, res) => {
  const { email } = req.params;

  let passport = await RepairPassport.findOne({ email });
  if (!passport) {
    passport = await RepairPassport.create({ email });
  }

  res.json(passport);
});

/* ADD pickup entry */
router.post("/add", async (req, res) => {
  const { email, entry, credit } = req.body;

  let passport = await RepairPassport.findOne({ email });
  if (!passport) {
    passport = await RepairPassport.create({ email });
  }

  passport.history.unshift(entry);
  passport.credits += credit;

  await passport.save();
  res.json({ success: true });
});

module.exports = router;