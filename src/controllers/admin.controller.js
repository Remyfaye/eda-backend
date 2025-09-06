import config from "../config/index.js";
import Treasury from "../models/Treasury.js";

async function createTreasury(req, res) {
  try {
    const isTreasuryExist = await Treasury.findOne();
    if (isTreasuryExist) return res.json("Treasury already exists");
    const treasury = await Treasury.create({ balance: config.treasuryStart });
    res.status(200).json({ message: "Treasury Created", treasury });
  } catch (err) {
    res.status(500).json(err.message);
  }
}

async function getTreasury(req, res) {
  try {
    const treasury = await Treasury.findOne();
    if (!treasury) {
      console.log("No treasury found");
      return res.json("No treasury found");
    }

    res.status(200).json(treasury);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

export { createTreasury, getTreasury };
