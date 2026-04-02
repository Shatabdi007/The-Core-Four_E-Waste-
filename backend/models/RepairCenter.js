import mongoose from "mongoose";

const repairCenterSchema = new mongoose.Schema({
  name: String,
  category: String,
  address: String,
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: [Number], // [lng, lat]
  },
});

repairCenterSchema.index({ location: "2dsphere" });

export default mongoose.model("RepairCenter", repairCenterSchema);
