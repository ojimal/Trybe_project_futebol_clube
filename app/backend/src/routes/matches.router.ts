import { Router } from 'express';
import TokenAuth from '../middlewares/TokenAuth';
import Controller from '../controllers/matches.controller';

const router = Router();

router.get('/', (req, res) => Controller.findAll(req, res));
router.post('/', TokenAuth, (req, res) => Controller.createMatch(req, res));
router.patch('/:id', TokenAuth, (req, res) => Controller.updateMatch(req, res));
router.patch('/:id/finish', TokenAuth, (req, res) => Controller.finishMatch(req, res));

export default router;
