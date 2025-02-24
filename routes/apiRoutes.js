import express from 'express';
import { getUser, test } from '../handlers/apiHandler.js';

const router = express.Router();

router.get('/user', getUser);
router.get('/test', test)

export default router;