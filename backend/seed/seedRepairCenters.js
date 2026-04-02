import mongoose from "mongoose";
import RepairCenter from "../models/RepairCenter.js";

mongoose.connect("mongodb://localhost:27017/sudhaarsetu");

const centers = [
  {
    name: "Nearby Mobile Repair",
    category: "mobile",
    address: "Near your location",
    location: {
      type: "Point",
      coordinates: [83.344, 26.558],
    },
  },
  {
    name: "Nearby Laptop Repair",
    category: "laptop",
    address: "Near your location",
    location: {
      type: "Point",
      coordinates: [83.35, 26.56],
    },
  },
  {
    name: "Nearby Appliance Repair",
    category: "appliance",
    address: "Near your location",
    location: {
      type: "Point",
      coordinates: [83.34, 26.55],
    },
  },
];

async function seed() {
  try {
    await RepairCenter.deleteMany(); // clear old data
    await RepairCenter.insertMany(centers);
    console.log("✅ Repair centers added to database");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();
