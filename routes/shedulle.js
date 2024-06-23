import express from "express";
const router = express.Router();

import { createEvent, getShedullesByOrgId } from "../controllers/shedulle.controller.js";

router.get("/getShedullesByOrgId", getShedullesByOrgId);
router.post("/createEvent", createEvent);

export default router;