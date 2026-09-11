import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    },
  );
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  const email = req.body.email?.trim().toLowerCase();

  // Check required fields
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please provide all required fields!",
    });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate JWT
  const token = generateToken(user._id);

  // Store token in HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  return res.status(201).json({
    message: "User created successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check required fields
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  // Find user
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  // Compare password
  const matchPassword = await bcrypt.compare(password, existingUser.password);

  if (!matchPassword) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  // Generate JWT
  const token = generateToken(existingUser._id);

  // Store token in HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  return res.status(200).json({
    message: "You logged in successfully",
    user: {
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    },
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
});

export const checkAuth = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select("-password");

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});
