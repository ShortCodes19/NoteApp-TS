import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please provide all required fields!",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(500).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "keasd", {
    expiresIn: "30d",
  });

  return res.status(201).json({
    message: "User created successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });
});
