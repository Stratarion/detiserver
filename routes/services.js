import express from 'express';

import {
	getServicesByUserIdAndType,
	createService,
	updateService,
  deleteService,
  getServicesByType,
  getServiceById,
	getSportServices,
	getDevelopmenttServices,
} from '../controllers/services.controller.js';

const router = express.Router();

router.get('/byuserandtype', getServicesByUserIdAndType);
router.post('/create', createService);
router.patch('/update/:id', updateService);
router.delete('/delete/:id', deleteService);
router.get('/bytype', getServicesByType);
router.get('/:id', getServiceById);
router.post('/sport/list', getSportServices);
router.post('/development/list', getDevelopmenttServices);

export default router;