import express from 'express';

import { checkUserReview, getReviewsById, createNewReview } from '../controllers/reviews.controller.js';

const router = express.Router();

router.get('/list', getReviewsById);
router.post('/create', createNewReview);
router.get('/check', checkUserReview);

export default router;