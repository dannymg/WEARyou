import { Router } from "express";
import {
  getUserNotification,
  getUserNotifications,
  createNotification,
  updateStateNotification,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = Router();

router.get("/user/:username/notification/", getUserNotifications);
router.get("/user/:username/notification/:code", getUserNotification);
router.post("/notification", createNotification);
router.put("/notification/:state", updateStateNotification);
router.delete("/notification/:code", deleteNotification);

export default router;
