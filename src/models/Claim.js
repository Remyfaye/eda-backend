import mongoose from "mongoose";

const ClaimSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  campaignId: { type: String },
  taskType: { type: String },
  proofUrl: { type: String, required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "paid"],
    default: "pending",
  },
  processedBy: { type: String },
  processedAt: { type: Date },
  txRef: { type: String },
  createdAt: { type: Date, default: () => new Date() },
});

export default mongoose.model("Claim", ClaimSchema);
