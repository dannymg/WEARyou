import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  signInUser,
} from "../controllers/userController.js";
import { constants } from "../config/constants.js";
import { hasRole } from "../utils/authUtils.js";

const router = Router();

router.get("/user", hasRole([constants.ROLES.ADMIN]), getUsers);
router.get("/user/:username", hasRole([constants.ROLES.CLIENT, constants.ROLES.ADMIN]), getUser);
router.put("/user/:username", hasRole([constants.ROLES.ADMIN]), updateUser);
router.delete("/user/:username", hasRole([constants.ROLES.ADMIN]), deleteUser);
router.post("/user/sign_in", signInUser);
router.post("/user/sign_up", createUser);

export default router;
