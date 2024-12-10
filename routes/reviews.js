import express from 'express';

import { checkUserReview, getReviewsById, createNewReview, updateReview, deleteReview } from '../controllers/reviews.controller.js';

const router = express.Router();

router.get('/list', getReviewsById);
router.post('/create', createNewReview);
router.get('/check', checkUserReview);
router.post('/delete', deleteReview);
router.put('update', updateReview);

export default router;