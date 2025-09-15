import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.routes.js";
import claimRoutes from "./routes/claim.routes.js";
import campaignRoutes from "./routes/campaign.routes.js";

const app = express();
app.use(express.json());
app.use(cors());

// serve static uploads
app.use("/uploads", express.static("src/uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/campaigns", campaignRoutes);

app.get("/", (req, res) => res.json("Edachain Backend"));

export default app;
