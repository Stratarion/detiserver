import express from 'express';

import {
  createBids,
	getBidsByServiceId,
	getBidsByUserId,
	updateBid,
	deleteBid,
} from '../controllers/bids.controller.js';

const router = express.Router();

router.get('/getBidsByServiceId', getBidsByServiceId);
router.get('/getBidsByUserId', getBidsByUserId);
router.post('create/', createBids);
router.patch('/:id', updateBid);
router.delete('/:id', deleteBid);

export default router;