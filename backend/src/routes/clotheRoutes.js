import { Router } from "express";
import {
  getClothe,
  getClothes,
  createClothe,
  updateClothe,
  deleteClothe,
} from "../controllers/clotheController.js";
import { constants } from "../config/constants.js";
import { hasRole } from "../utils/authUtils.js";

const router = Router();

router.get("/clothe", getClothes);
router.get("/clothe/:code", getClothe);
router.post("/clothe", hasRole([constants.ROLES.ADMIN]), createClothe);
router.put("/clothe/:code", hasRole([constants.ROLES.ADMIN]), updateClothe);
router.delete("/clothe/:code", hasRole([constants.ROLES.ADMIN]), deleteClothe);

export default router;
