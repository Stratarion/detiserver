import express from 'express';

import { getGardenList, getSchoolList, getOrganisationByUserId, getOrganisations, organisationUpdate, createOrganisation, destroyOrganisations, getOrganisationById } from '../controllers/organisations.controller.js';

const router = express.Router();
// import auth from "../middleware/auth.js";

router.get('/', getOrganisations);
router.post('/create', createOrganisation);
router.get('/destroy', destroyOrganisations);
router.get('/getOrganisationById', getOrganisationById);
router.get('/byuserid', getOrganisationByUserId);
router.post('/update', organisationUpdate);
router.post('/school', getSchoolList);
router.post('/garden', getGardenList);


export default router;