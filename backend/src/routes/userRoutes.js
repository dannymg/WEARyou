import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  signInUser,
} from "../controllers/userController.js";
import { constants } from "../config/constants.js"
import { hasRole } from '../utils/authUtils.js'

const router = Router();

router.get("/user", getUsers);
router.get("/user/:username", hasRole([constants.ROLES.CLIENT]), getUser);
router.put("/user/:username", updateUser);
router.delete("/user/:username", deleteUser);
router.post("/user/sign_in", signInUser);
router.post("/user/sign_up", createUser);

export default router;
