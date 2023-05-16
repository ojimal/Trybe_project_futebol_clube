import { Request, Response } from 'express';
import Service from '../services/teams.service';

export default class TeamsController {
  private teamsService: Service;

  constructor(teamsService = new Service()) {
    this.teamsService = teamsService;
  }

  async findAll(_req: Request, res: Response): Promise<void> {
    const allTeams = await this.teamsService.findAll();

    res.status(200).json(allTeams);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const teamId = await this.teamsService.findById(Number(id));

    res.status(200).json(teamId);
  }
}
