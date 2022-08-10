import { Router } from "express";
import {
  getUserNotification,
  getUserNotifications,
  createNotification,
  updateStateNotification,
  deleteNotification,
  getAllNotifications,
} from "../controllers/notificationController.js";
import { hasRole } from "../utils/authUtils.js";
import { constants } from "../config/constants.js";

const router = Router();

router.get("/notification", hasRole([constants.ROLES.ADMIN]), getAllNotifications);
router.get("/user/:username/notification/", hasRole([constants.ROLES.ADMIN]), getUserNotifications);
router.get("/user/:username/notification/:code", hasRole([constants.ROLES.ADMIN]), getUserNotification);
router.post("/notification", hasRole([constants.ROLES.ADMIN]), createNotification);
router.put("/notification/:state", hasRole([constants.ROLES.ADMIN]), updateStateNotification);
router.delete("/notification/:code", hasRole([constants.ROLES.ADMIN]), deleteNotification);

export default router;
