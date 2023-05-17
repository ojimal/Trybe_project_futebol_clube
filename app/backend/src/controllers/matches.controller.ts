import { Request, Response } from 'express';
import Service from '../services/matches.service';

export default class MatchesController {
  public static findAll = async (req: Request, res: Response): Promise<void> => {
    const { inProgress } = req.query;
    const allMatches = await Service.findAllMatches(inProgress);
    res.status(200).json(allMatches);
  };

  public static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await Service.finishMatch(+id);
    res.status(200).json({ message: 'Finished' });
  }

  public static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const updatedMatch = req.body;
    const updated = await Service.updateMatch(+id, updatedMatch);
    res.status(200).json(updated);
  }

  public static async createMatch(req: Request, res: Response) {
    const newMatch = req.body;
    const createMatch = await Service
      .createMatch(newMatch);
    res.status(201).json(createMatch);
  }
}
