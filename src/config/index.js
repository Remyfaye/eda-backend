import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  adminApiKey: process.env.ADMIN_API_KEY,
  treasuryStart: Number(process.env.TREASURY_START_BALANCE),
};
