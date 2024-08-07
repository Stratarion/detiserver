import express from 'express';

import { getOrganisations, organisationUpdate, createOrganisation, destroyOrganisations, getOrganisationById } from '../controllers/organisations.controller.js';

const router = express.Router();
// import auth from "../middleware/auth.js";

router.get('/', getOrganisations);
router.post('/create', createOrganisation);
router.get('/destroy', destroyOrganisations);
router.get('/getOrganisationById', getOrganisationById);
router.post('/update', organisationUpdate);

export default router;