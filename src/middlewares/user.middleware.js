import User from "../models/User";

function checkExistingUser(req, res, next) {
  const { userId } = req.body;
  const existing = User.findById(userId);

  if (existing) {
    return res.status(500).json("User Already exixts");
  }
  next();
}
