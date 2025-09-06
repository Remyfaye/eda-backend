import Claim from "../models/Claim";

async function adminClaim(req, res, next) {
  const claim = await Claim.findById(req.params.id);
  if (!claim) return res.status(404).json("This claim does not exist");
  if (claim.status !== "pending")
    return res.status(400).json("this claim is not pending");
  next();
}

async function getClaim(req, res, next) {
  const claim = await Claim.findById(req.params.id);
  if (!claim) return res.status(404).json("This claim does not exist");
  next();
}

export { adminClaim, getClaim };
