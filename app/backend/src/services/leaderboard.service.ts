import LeaderBoardHome from '../utils/leaderBoardHome';
import LeaderBoardAway from '../utils/leaderBoardAway';
import MatchModel from '../database/models/Match.model';
import TeamModel from '../database/models/Team.model';

export default class LeaderBoardService {
  public static async findAllLeaderBoardHome() {
    const allTeams = await TeamModel.findAll({
      include: [
        { model: MatchModel, as: 'homeTeam', where: { inProgress: false } },
      ],
    }) as TeamModel[];

    const leaderBoardTeam = allTeams.map((team) => {
      const newLeader = new LeaderBoardHome(team.teamName);
      return newLeader.returnPointsHome(team.homeTeam);
    });

    return leaderBoardTeam
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }

  public static async findAllLeaderBoardAway() {
    const allTeams = await TeamModel.findAll({
      include: [
        { model: MatchModel, as: 'awayTeam', where: { inProgress: false } },
      ],
    }) as TeamModel[];

    const leaderBoardTeam = allTeams.map((team) => {
      const newLeader = new LeaderBoardAway(team.teamName);
      return newLeader.returnPointsAway(team.awayTeam);
    });

    return leaderBoardTeam
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }
}
