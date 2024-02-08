import express from "express";
const router = express.Router();

import { signin, signup, getUserList } from "../controllers/user.controller.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/getUserList", getUserList);

export default router;