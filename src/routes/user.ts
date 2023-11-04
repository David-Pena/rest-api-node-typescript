import { Router } from 'express';
import { checkIfHasToken, checkRequiredId, checkRequiredParams } from '../middlewares/user';
import { fetch, create, getById, edit, remove } from '../controllers/user';

const router = Router();

router.get('/', checkIfHasToken, fetch);
router.get('/:id', checkIfHasToken, checkRequiredId, getById);
router.post('/', checkRequiredParams, create);
router.put('/', checkIfHasToken, edit);
router.delete('/:id', checkIfHasToken, checkRequiredId, remove);

export default router;
