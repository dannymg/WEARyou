import { Router } from "express";
import {
  getClothe,
  getClothes,
  createClothe,
  updateClothe,
  deleteClothe,
} from "../controllers/clotheController.js";

const router = Router();

router.get("/clothe", getClothes);
router.get("/clothe/:code", getClothe);
router.post("/clothe", createClothe);
router.put("/clothe/:code", updateClothe);
router.delete("/clothe/:code", deleteClothe);

export default router;
