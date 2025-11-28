import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controller/message.controller.js";
import { ensureDBConnection } from "../middleware/dbConnection.middleware.js";

const router = express.Router();

// Apply DB connection middleware to all routes
router.use(ensureDBConnection);

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;

