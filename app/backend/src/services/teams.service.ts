import Model from '../database/models/Team.model';

export default class TeamsService {
  findAll = async (): Promise<Model[]> => {
    const teams = await Model.findAll();

    if (!teams) {
      const error: Error & { status?: number } = new Error('Teams not found');
      error.status = 404;
      throw error;
    }
    return teams;
  };

  findById = async (id: number): Promise<Model> => {
    const team = await Model.findByPk(id);
    if (!team) {
      const error: Error & { status?: number } = new Error('Team not found');
      error.status = 404;
      throw error;
    }
    return team;
  };
}
