import User from "../models/User.js";
import { nanoid } from "nanoid";

async function createUser(req, res) {
  try {
    const existing = await User.findOne({ email: req.body.email });

    if (existing) {
      return res.status(401).json({ message: "User Already exixts", email });
    }
    const custodialId = `cust_${nanoid(10)}`;
    const newUser = await User.create({ ...req.body, custodialId });
    res.status(201).json({ message: "User created Sucessfully", newUser });
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err.message);
  }
}

async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.json({ msg: "user does not exist" });

    res.status(200).json({ message: "user retrieved sucessfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export { createUser, getUser };
