import User from "../model/userModel.js";
import ApiError from "./ApiError.js";

const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(401, "Unauthorized access");
    }

    const accessToken = await user.generateAccessToken(user._id);
    const refreshToken = await user.generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Internal server error", error);
  }
};

export default generateToken;
