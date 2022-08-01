import { Router } from "express";
import {
  getAccount,
  getAccounts,
  createAccount,
  deleteAccount,
  updateAccount,
} from "../controllers/accountController.js";

const router = Router();

router.get("/account", getAccounts);
router.get("/account/:email", getAccount);
router.post("/account", createAccount);
router.put("/account/:email", updateAccount);
router.delete("/account/:email", deleteAccount);

export default router;
