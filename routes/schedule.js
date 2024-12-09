import express from 'express';

import { getScheduleEvents, createScheduleEvent } from '../controllers/schedule.controller.js';

const router = express.Router();

router.get('/events', getScheduleEvents);
router.post('/create', createScheduleEvent);

export default router;
