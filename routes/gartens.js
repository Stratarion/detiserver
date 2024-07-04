import express from "express";
const router = express.Router();

import { getGartens } from "../controllers/gartens.controller.js";

router.get("/", getGartens);

export default router;
