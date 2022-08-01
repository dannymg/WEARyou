import { Router } from "express";
import {
  getDetail,
  getDetails,
  createDetail,
  updateDetail,
  deleteDetail,
} from "../controllers/detailController.js";

const router = Router();

router.get("/detail", getDetail);
router.get("/detail/:code", getDetails);
router.post("/detail", createDetail);
router.put("/detail/:code", updateDetail);
router.delete("/detail/:code", deleteDetail);

export default router;
