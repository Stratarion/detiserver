import express from 'express';

import multer from 'multer';
const upload = multer({ dest: 'images/' })
const router = express.Router();
import { uploadFile } from "../controllers/file.controller.js";



router.post("/image", uploadFile);
export default router;