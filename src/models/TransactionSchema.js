import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["credit", "debit"], required: true },
  note: { type: String },
  createdAt: { type: Date, default: () => new Date() },
});

export default mongoose.model("Transaction", transactionSchema);
