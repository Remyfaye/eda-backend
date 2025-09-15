import User from "../models/User.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

async function register(req, res) {
  try {
    const existing = await User.findOne({ email: req.body.email });

    if (existing) {
      return res
        .status(401)
        .json({ status: "200", msg: "User Already exixts" });
    }
    const custodialId = `cust_${nanoid(10)}`;
    const newUser = await User.create({ ...req.body, custodialId });
    res.status(201).json({ status: "success", data: newUser });
  } catch (err) {
    res.status(500).json({ status: "failed", msg: err.message });
    console.log(err.message);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // console.log(user);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Replace this with your actual password check logic
    // const isMatch = user.password === password;
    // if (!isMatch) {
    //   return res.status(401).json({ message: "Invalid email or password" });
    // }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      status: "success",
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ status: "success", error: err.message });
  }
}

// ...existing code...

export { register, login };
