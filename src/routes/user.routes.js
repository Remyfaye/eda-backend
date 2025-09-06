import express from "express";
import { createUser, getUser } from "../controllers/user.controller.js";
import { submitClaim } from "../controllers/claim.controller.js";

const router = express.Router();

// auth
router.post("/register", createUser);
router.get("/:id", getUser);

// claims
router.post("/submitClaim", submitClaim);

export default router;
