import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import { signin, signup, getUserList, destroyUsers, authUser, userUpdate } from "../controllers/user.controller.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/getUserList", getUserList);
router.get("/destroyUsers", destroyUsers);
router.post("/update", userUpdate)
router.get("/auth", auth, authUser);

export default router;