import mongoose from "mongoose";

const TreasurySchema = new mongoose.Schema({
  balance: { type: Number },
  updatedAt: { type: Date, default: () => new Date() },
});

export default mongoose.model("Treasury", TreasurySchema);
