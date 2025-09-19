import express from "express";
import { getWords } from "../controllers/wordController.js";

const router = express.Router();

router.get("/", getWords);

export default router;
