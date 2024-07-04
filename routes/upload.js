import express from 'express';

import { middlewareMulter } from '../middleware/file.js';
import multer from 'multer';
const upload = multer({ dest: 'images/' })
const router = express.Router();
import { postImage } from '../controllers/images.controller.js';
import { uploadFile } from "../controllers/file.controller.js";


router.post('/singleImage', middlewareMulter.single("avatar"), postImage);

router.post("/image", uploadFile);
export default router;