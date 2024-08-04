import express from "express";
import { checkoutSession } from "../controllers/payment.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/create-checkout-session", verifyToken, checkoutSession);

export default router;
