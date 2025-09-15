import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  taskType: { type: String },
  url: { type: String, required: true },
  amount: { type: Number, required: true },
  state: {
    type: String,
    enum: ["active", "suspended"],
    default: "active",
  },

  createdAt: { type: Date, default: () => new Date() },
});

export default mongoose.model("Campaign", CampaignSchema);
