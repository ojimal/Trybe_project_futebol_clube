import { Router } from 'express';
import Controller from '../controllers/users.controller';
import loginAuth from '../middlewares/LoginAuth';
import tokenAuth from '../middlewares/TokenAuth';

const router = Router();

router.post('/', loginAuth, (req, res) => Controller.login(req, res));
router.get('/role', tokenAuth, (req, res) => Controller.findRole(req, res));

export default router;
