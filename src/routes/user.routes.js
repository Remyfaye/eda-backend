import express from "express";
import { addWallet, getUser } from "../controllers/user.controller.js";
import { submitClaim } from "../controllers/claim.controller.js";

const router = express.Router();

// auth
router.get("/:id", getUser);

// claims
router.post("/wallet", addWallet);

export default router;
