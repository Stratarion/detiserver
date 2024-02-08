import express from 'express';

// import fileMiddleware from '../middleware/file.js';
import multer from 'multer';
const upload = multer({ dest: 'images/' })
const router = express.Router();
import { postImage } from '../controllers/images.controller.js';


router.post('/singleImage', upload.single("avatar"), postImage);

export default router;