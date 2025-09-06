import express from "express";
import {
  approveClaim,
  getPendingClaims,
  rejectClaim,
} from "../controllers/claim.controller.js";
import {
  createTreasury,
  getTreasury,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/approveClaim/:id", approveClaim);
router.post("/rejectClaim/:id", rejectClaim);
router.post("/getPendingClaims", getPendingClaims);
router.post("/creatTreasury", createTreasury);
router.get("/getTreasury", getTreasury);

export default router;
