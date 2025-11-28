import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { ensureDBConnection } from "../middleware/dbConnection.middleware.js";

const router = express.Router();

// Apply DB connection middleware to all routes
router.use(ensureDBConnection);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);

export default router;

