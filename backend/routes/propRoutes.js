import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
  prop_register,
  prop_edit,
  prop_delete,
  prop_search,
} from '../controllers/propControlller.js';

const router = express.Router();

router.post('/property/prop_add',verifyToken, prop_register);
router.post('/auth/prop_edit', prop_edit);
router.post('/auth/prop_search', prop_search);
router.post('/auth/prop_delete', prop_delete);

export default router;
