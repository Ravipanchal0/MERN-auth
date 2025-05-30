import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: "String",
      required: true,
      select: false,
    },
    refreshToken: {
      type: "String",
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(15);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.passwordValidator = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function (userId) {
  const accessToken = jwt.sign({ _id: userId }, TOKEN_SECRET, {
    expiresIn: "1d",
  });
  return accessToken;
};

userSchema.methods.generateRefreshToken = async function (userId) {
  const refreshToken = jwt.sign({ _id: userId }, TOKEN_SECRET, {
    expiresIn: "30d",
  });
  return refreshToken;
};

const User = mongoose.model("User", userSchema);
export default User;
