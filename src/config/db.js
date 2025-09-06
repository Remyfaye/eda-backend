import mongoose from "mongoose";
import config from "./index.js";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return; // prevent multiple connections

  try {
    await mongoose.connect(config.mongoUri);
    isConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}
