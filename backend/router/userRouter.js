import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updatePassword,
} from "../controller/userController.js";
import verifyAccessToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyAccessToken, logoutUser);
router
  .route("/profile")
  .get(verifyAccessToken, getUserProfile)
  .put(verifyAccessToken, updateUserProfile);
router.route("/profile/changePassword").put(verifyAccessToken, updatePassword);

export default router;
