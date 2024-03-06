import express from 'express';

import { middlewareMulter } from '../middleware/file.js';
import multer from 'multer';
const upload = multer({ dest: 'images/' })
const router = express.Router();
import { postImage } from '../controllers/images.controller.js';


router.post('/singleImage', middlewareMulter.single("avatar"), postImage);

export default router;