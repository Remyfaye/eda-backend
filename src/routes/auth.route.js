import express from "express";
import { submitClaim } from "../controllers/claim.controller.js";
import { login, register } from "../controllers/auth.controller.js";

const router = express.Router();

// auth
router.post("/register", register);
router.post("/login", login);

export default router;
