import express from "express";
import {
  createCampaign,
  getCampaigns,
} from "../controllers/campaign.controlller.js";

const router = express.Router();

router.post("/create", createCampaign);
router.get("/getAll", getCampaigns);

export default router;
