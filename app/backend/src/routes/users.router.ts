import { Router } from 'express';
import Controller from '../controllers/users.controller';
import loginAuth from '../middlewares/LoginAuth';
import tokenAuth from '../middlewares/TokenAuth';

const router = Router();

const usersController = new Controller();

router.post('/', loginAuth, (req, res) => usersController.login(req, res));
router.get('/role', tokenAuth, (req, res) => usersController.findRole(req, res));

export default router;
