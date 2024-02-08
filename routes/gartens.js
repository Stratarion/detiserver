import express from 'express';

import { getGartens, createGarten, destroyGartens } from '../controllers/gartens.controller.js';

const router = express.Router();
// import auth from "../middleware/auth.js";

router.get('/', getGartens);
router.post('/create_garten', createGarten);
router.get('/destroy_gartens', destroyGartens);


export default router;