import express from "express";
const router = express.Router();

import { getInfoSheduller } from "../controllers/info.controller.js";

router.get("/sheduller", getInfoSheduller);

export default router;
