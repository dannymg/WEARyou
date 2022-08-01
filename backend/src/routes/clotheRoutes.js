import { Router } from "express";
import {
  getClothe,
  getClothes,
  createClothe,
  updateClothe,
  deleteClothe,
} from "../controllers/clotheController.js";

const router = Router();

router.get("/clothe", getClothe);
router.get("/clothe/:code", getClothes);
router.post("/clothe", createClothe);
router.put("/clothe/:code", updateClothe);
router.delete("/clothe/:code", deleteClothe);

export default router;
