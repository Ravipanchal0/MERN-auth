import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";
import { NODE_ENV } from "../config/config.js";

const cookiesOptions = {
  httpOnly: true,
  secure: NODE_ENV !== "development",
  sameSite: "strict",
};

// @desc Register user
// POST /api/user/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(404, "All fields are required");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, "Email already exists.");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (!user) {
    throw new ApiError(500, "Account creation failed");
  }

  const registeredUser = await User.findOne({ email });

  res
    .status(200)
    .json(new ApiResponse(201, registeredUser, "Registered successfully"));
});

// @desc Login user
// POST /api/user/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(404, "All fields are required");
  }

  const user = await User.findOne({ email: email.toLowerCase() })?.select(
    "+password"
  );
  if (!user) {
    throw new ApiError(404, "User doesn't exist");
  }

  const isPasswdValid = await user.passwordValidator(password);
  if (!isPasswdValid) {
    throw new ApiError(400, "Invalid credentials");
  }

  const loggedInUser = await User.findOne({ email: email.toLowerCase() });

  const { accessToken, refreshToken } = await generateToken(loggedInUser._id);

  res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...cookiesOptions,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      ...cookiesOptions,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .json(new ApiResponse(200, loggedInUser, "Logged in successfully"));
});

// @desc Logout user
// POST /api/user/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;

  user.refreshToken = "";
  await user.save({ validateBeforeSave: false });

  res
    .status(200)
    .clearCookie("accessToken", { httpOnly: true, expires: new Date(0) })
    .clearCookie("refreshToken", { httpOnly: true, expires: new Date(0) })
    .json(new ApiResponse(200, {}, "logged out successfully"));
});

// @desc Get user profile
// GET /api/user/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, req.user, "Current user"));
});

// @desc Update user profile
// PUT /api/user/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const user = req.user;

  if ([name, email].some((field) => field === "")) {
    throw new ApiError(404, "Can't update empty data");
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      name,
      email,
    },
    { new: true }
  );

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "User details updated successfully")
    );
});

// @desc Update user password
// PUT /api/user/profile/changePassword
// @access Private
const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if ([oldPassword, newPassword].some((field) => field === "")) {
    throw new ApiError(404, "All fields are required");
  }

  if (oldPassword === newPassword) {
    throw new ApiError(401, "Password didn't change. Password is same.");
  }

  const user = await User.findById(req.user._id).select("+password");

  const validPassword = await user.passwordValidator(oldPassword);
  if (!validPassword) {
    throw new ApiError(401, "Old password is incorrect!");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Password has been changed successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updatePassword,
};
