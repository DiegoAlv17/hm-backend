import mongoose from "mongoose";

const healthCenterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contactEmail: { type: String, required: true },
  psychologists: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Psicólogos asociados
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("HealthCenter", healthCenterSchema);
