import config from "../config/index.js";
import Treasury from "../models/Treasury.js";
import User from "../models/User.js";

async function createTreasury(startBalance) {
  const existing = await Treasury.findOne();

  if (existing) return existing;

  const treasury = await Treasury.Create({ balance: startBalance });
  return treasury;
}

async function getTreasury() {
  let treasury = await Treasury.findOne();
  if (!treasury) {
    treasury = await createTreasury(config.treasuryStart);
  }
  return treasury;
}

async function payUser(userId, amount, note = "") {
  // console.log(tx, treasury, user);

  if (amount <= 0) throw new Error("Invalid Amount");

  const treasury = await getTreasury();

  if (treasury.balance < amount) {
    throw new Error("Insufficient Funds");
  }

  const user = await User.findById(userId);
  if (!user) console.log("User not found");

  treasury -= amount;
  treasury.updatedAt = new Date();
  await treasury.save();

  user.balance += amount;
  await user.save();

  const tx = await Transaction.create({
    userId: user._id,
    amount,
    type: "credit",
    note,
  });
  console.log(tx, treasury, user);

  return { tx, treasury, user };
}

export { createTreasury, getTreasury, payUser };
