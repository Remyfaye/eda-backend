import Campaign from "../models/Campaign.js";
import Claim from "../models/Claim.js";
import { payUser } from "../services/treasury.service.js";
import { getTreasury } from "../services/treasury.service.js";

async function submitClaim(req, res) {
  try {
    const existing = await Claim.findOne({
      proofUrl: req.body.proofUrl,
    });
    if (existing) {
      return res.json({
        status: 401,
        msg: "you have already submited this claim",
      });
    }

    if (!req.body.userId || !req.body.amount)
      return res.json({ status: "401", msg: "User or amount not found" });

    const newClaim = await Claim.create(req.body);
    res.json({ status: "200", data: newClaim });
  } catch (err) {
    res.json({ status: "500", msg: err.message });
    throw new Error();
  }
}

async function getPendingClaims(req, res) {
  try {
    const pendingClaims = await Claim.find({ status: "pending" });

    if (!pendingClaims) return res.status(404).json("no pending claim");
    res.json(pendingClaims);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function approveClaim(req, res) {
  try {
    const admin = req.header("x-admin-key");
    const claim = await Claim.findById(req.params.id);

    // if (!claim) return res.json("claim does not exist");

    const { tx, treasury, user } = await payUser(
      claim.userId,
      claim.amount,
      `claim ${claim._id} approved`
    );
    console.log("data:", claim, tx, user, treasury);

    // claim.status = "paid";
    // claim.processedBy = "admin";
    // claim.processedAt = new Date();
    // claim.txRef = tx._id.toString();
    // await claim.save();

    res.status(200).json({
      message: "Claim has been approved",
      data: { claim, tx, user, treasury },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function rejectClaim(req, res) {
  try {
    const claim = await Claim.findById(req.params.id);
    const reason = req.body.reason || "rejected by admin";

    claim.status = "rejected";
    claim.processedBy = "admin";
    claim.processedAt = new Date();
    claim.txRef = reason;

    await claim.save();
    res.json({ message: "Claim has been rejected", claim });
  } catch (err) {
    res.status(500).json(err.message);
  }
}

// already had submitClaim(), add new version w/ file upload
export async function submitClaimWithFile(req, res) {
  try {
    const { userId, campaignId, taskType, amount } = req.body;

    const existing = await Claim.findById({ userId, campaignId });
    if (existing)
      return res.json({
        status: "401",
        msg: "You have already submitted this claim",
      });
    if (!userId || !amount) {
      return res
        .status(400)
        .json({ status: "401", msg: "userId and amount required" });
    }

    let proofUrl = null;
    if (req.file) {
      proofUrl = `/uploads/${req.file.filename}`;
    }

    const claim = await Claim.create({
      userId,
      campaignId,
      taskType,
      proofUrl,
      amount,
    });

    res.json({ status: "200", claim });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "500", msg: err.message });
  }
}

export async function getUserClaim(req, res) {
  try {
    const userClaims = await Claim.find({ userId: req.params.userId });

    if (!userClaims || userClaims.length === 0) {
      return res.json({ status: "400", msg: "No claims found" });
    }

    // Extract campaign IDs from claims
    const campaignIds = userClaims.map((claim) => claim.campaignId);

    // Fetch all related campaigns
    const userCampaigns = await Campaign.find({ _id: { $in: campaignIds } });

    res.json({
      status: "200",
      data: { claims: userClaims, campaigns: userCampaigns },
    });
  } catch (error) {
    res.json({ status: "500", msg: error.message });
  }
}

export { submitClaim, getPendingClaims, approveClaim, rejectClaim };
