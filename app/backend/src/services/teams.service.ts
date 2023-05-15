import Model from '../database/models/Team.model';

export default class TeamsService {
  findAll = async (): Promise<Model[]> => {
    try {
      const teams = await Model.findAll();
      return teams;
    } catch (error) {
      throw new Error('Failed to find all teams');
    }
  };

  findById = async (id: number): Promise<Model> => {
    const team = await Model.findByPk(id);
    if (!team) {
      throw new Error('Team not found');
    }
    return team;
  };
}
