import express from "express";
const router = express.Router();

import { getGartens } from "../controllers/gartens.controller.js";

router.post("/", getGartens);

export default router;
