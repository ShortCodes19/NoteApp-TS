import express from "express";
import protectedRoute from "../middleware/authMiddleware.js";
import {
  loginUser,
  logoutUser,
  registerUser,
  checkAuth,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", protectedRoute, checkAuth);

export default router;
