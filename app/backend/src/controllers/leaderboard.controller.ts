import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderboard.service';

export default class LeaderController {
  public static async findAllLeaderBoardHome(req: Request, res: Response) {
    const allLeader = await LeaderBoardService.findAllLeaderBoardHome();
    res.status(200).json(allLeader);
  }

  public static async findAllLeaderBoardAway(req: Request, res: Response) {
    const allLeader = await LeaderBoardService.findAllLeaderBoardAway();
    res.status(200).json(allLeader);
  }
}
