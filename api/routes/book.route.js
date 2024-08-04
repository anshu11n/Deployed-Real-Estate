import express from "express";
import { bookPost } from "../controllers/book.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/bookPost", verifyToken, bookPost);

export default router;
