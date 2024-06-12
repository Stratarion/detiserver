import express from "express";
const router = express.Router();

import { createWorker, getWorkersByOrgId } from "../controllers/worker.controller.js";

router.post("/create", createWorker);
router.get("/getWorkersByOrgId", getWorkersByOrgId);

export default router;