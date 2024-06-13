import express from "express";
const router = express.Router();

import { createLesson, getLessonsByOrgId } from "../controllers/lesson.controller.js";

router.post("/create", createLesson);
router.get("/getLessonsByOrgId", getLessonsByOrgId);

export default router;