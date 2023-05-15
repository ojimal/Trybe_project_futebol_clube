import { Router } from 'express';
import Controller from '../controllers/teams.controller';

const router = Router();

const teamsController = new Controller();

// arrow function to preserve property 'this' from controller
router.get('/', (req, res) => teamsController.findAll(req, res));
router.get('/:id', (req, res) => teamsController.findById(req, res));

export default router;
