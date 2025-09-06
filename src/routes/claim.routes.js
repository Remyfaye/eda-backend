import express from "express";
import multer from "multer";
import { submitClaim, submitClaimWithFile,getPendingClaims } from "../controllers/claim.controller.js";

// configure multer for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "src/uploads/"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + "-" + file.originalname);
  }
});
const upload = multer({ storage });

const router = express.Router();

// JSON claim submission
router.post("/", submitClaim);
router.get("/", getPendingClaims);
router.post("/", upload.single("proofFile"), submitClaimWithFile);
// File-based claim submission
router.post("/upload", upload.single("proofFile"), submitClaimWithFile);

export default router;
