import Campaign from "../models/Campaign.js";

export async function createCampaign(req, res) {
  try {
    const newCaimpagn = await Campaign.create(req.body);

    res.json({
      status: "200",
      data: newCaimpagn,
      msg: "Your campaign has been created",
    });
  } catch (error) {
    res.json({ status: "500", error: error.message });
  }
}

export async function getCampaigns(req, res) {
  try {
    const campaign = await Campaign.find();

    res.json({ status: "200", data: campaign, msg: "campaigns retreived" });
  } catch (error) {
    res.json({ status: "500", error: error.message });
  }
}
