import User from "../models/User.js";
import { nanoid } from "nanoid";

async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.json({ status: "200", error: "user does not exist" });

    res.status(200).json({
      status: "200",
      data: user,
      msg: `Welcome Back ${user.name}!`,
    });
  } catch (err) {
    res.status(500).json({ status: "500", error: err.message });
  }
}

const addWallet = async (req, res) => {
  const { address, id } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { walletAddress: address },
      { new: true }
    );
    // console.log(user);

    if (!user)
      return res
        .status(401)
        .json({ status: "401", error: "User does not exixts" });

    res.status(200).json({
      status: "200",
      msg: "Wallet connected successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({ status: "500", msg: error.message });
  }
};

export { getUser, addWallet };
