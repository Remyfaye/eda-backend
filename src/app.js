import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import claimRoutes from "./routes/claim.routes.js";

const app = express();
app.use(express.json());
app.use(cors());

// serve static uploads
app.use("/uploads", express.static("src/uploads"));

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/claims", claimRoutes);

app.get("/", (req, res) => res.json("Edachain Backend"));

export default app;
