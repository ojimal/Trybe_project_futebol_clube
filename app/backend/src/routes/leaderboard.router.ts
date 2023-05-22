import { Router } from 'express';
import LeaderController from '../controllers/leaderboard.controller';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', LeaderController.findAllLeaderBoardHome);
leaderBoardRouter.get('/away', LeaderController.findAllLeaderBoardHome);

export default leaderBoardRouter;
