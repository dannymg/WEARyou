import { Router } from "express";
import {
  getDetail,
  getDetails,
  createDetail,
  updateDetail,
  deleteDetail,
} from "../controllers/detailController.js";
import { constants } from "../config/constants.js";

const router = Router();

router.get("/detail", hasRole([constants.ROLES.ADMIN]), getDetail);
router.get("/detail/:code", hasRole([constants.ROLES.CLIENT, constants.ROLES.ADMIN]), getDetails);
router.post("/detail", hasRole([constants.ROLES.CLIENT, constants.ROLES.ADMIN]), createDetail);
router.put("/detail/:code", hasRole([constants.ROLES.CLIENT, constants.ROLES.ADMIN]), updateDetail);
router.delete("/detail/:code", hasRole([constants.ROLES.CLIENT, constants.ROLES.ADMIN]), deleteDetail);

export default router;
