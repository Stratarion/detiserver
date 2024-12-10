import express from 'express';

import { getScheduleEvents, createScheduleEvent, deleteScheduleEvent, updateScheduleEvent } from '../controllers/schedule.controller.js';

const router = express.Router();

router.get('/events', getScheduleEvents);
router.post('/create', createScheduleEvent);
router.put('/update', updateScheduleEvent);
router.delete('/delete', deleteScheduleEvent);

export default router;
