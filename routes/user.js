import express from "express";
const router = express.Router();

import { signin, signup, getUserList, destroyUsers } from "../controllers/user.controller.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/getUserList", getUserList);
router.get("/destroyUsers", destroyUsers);

export default router;