import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  walletAddress: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  custodialId: { type: String, unique: true, index: true },
  balance: { type: Number, default: 0 },
  createdAt: { type: Date, default: () => new Date() },
});

export default mongoose.model("User", UserSchema);
