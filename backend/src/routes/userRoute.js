import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/user", getUsers);
router.get("/user/:username", getUser);
router.post("/user", createUser);
router.put("/user/:username", updateUser);
router.delete("/user/:username", deleteUser);

export default router;
