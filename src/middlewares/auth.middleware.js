import config from "../config/index.js";

export default function adminAuth(req, res, next) {
  const key = req.header("x-admin-key");

  if (!key || key !== config.adminApiKey) {
    return res.status(401).json({ error: "Unauthorized:invalid admin key" });
  }
  next();
}
