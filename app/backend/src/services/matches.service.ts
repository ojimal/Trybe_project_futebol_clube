import Model from '../database/models/Match.model';
import TeamModel from '../database/models/Team.model';

export interface NewMatchI {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
}

export interface MatchI extends NewMatchI {
  id: number,
  inProgress: boolean,
}

class MatchesService {
  public static async findAllMatches(inProgress: unknown): Promise<MatchI[]> {
    const allMatches = await Model.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    if (inProgress === 'true' || inProgress === true) {
      return allMatches.filter((match) => match.inProgress === true);
    }

    if (inProgress === 'false' || inProgress === false) {
      return allMatches.filter((match) => match.inProgress === false);
    }

    return allMatches;
  }

  public static createMatch = async (newMatch: NewMatchI): Promise<MatchI> => {
    const homeTeamExists = await TeamModel.findOne({
      where: { id: newMatch.homeTeamId },
    });
    const awayTeamExists = await TeamModel.findOne({
      where: { id: newMatch.awayTeamId },
    });
    if (!homeTeamExists || !awayTeamExists) {
      const error: Error & { status?: number } = new Error(
        'There is no team with such id!',
      );
      error.status = 404;
      throw error;
    }
    const match = await Model.create({
      ...newMatch,
      inProgress: true,
    });
    return match;
  };

  public static updateMatch = async (id: number, updatedMatch: MatchI): Promise<MatchI> => {
    const match = await Model.findByPk(id);

    if (!match) {
      const error: Error & { status?: number } = new Error('Match not found');
      error.status = 404;
      throw error;
    }

    await match.update(updatedMatch);

    return match;
  };

  public static finishMatch = async (id: number): Promise<string> => {
    const match = await Model.findByPk(id);

    if (!match) {
      const error: Error & { status?: number } = new Error('Match not found');
      error.status = 404;
      throw error;
    }

    await match.update({ inProgress: false });

    return 'Finished';
  };
}

export default MatchesService;
