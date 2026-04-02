import express from "express";
import RepairCenter from "../models/RepairCenter.js";

const router = express.Router();

router.get("/nearby", async (req, res) => {
  const { lat, lng, category } = req.query;

  const centers = await RepairCenter.find({
    category,
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [Number(lng), Number(lat)],
        },
        $maxDistance: 200000, // 200 km
      },
    },
  });

  res.json(centers);
});

export default router;
