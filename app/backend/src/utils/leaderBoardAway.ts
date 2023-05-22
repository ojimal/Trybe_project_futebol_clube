export interface MatchI {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export default class LeaderBoard {
  private name: string;
  public totalPoints: number;
  private totalGames: number;
  public totalVictories: number;
  private totalDraws: number;
  private totalLosses: number;
  public goalsFavor: number;
  private goalsOwn: number;
  public goalsBalance: number;
  private efficiency: string;

  constructor(name: string) {
    // Initialize leaderboard properties
    this.name = name;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = '0';
  }

  private setVictory(homeTeamGoals: number, awayTeamGoals: number) {
    // Update leaderboard for a victory
    const {
      goalsFavor,
      goalsOwn,
      totalPoints,
      totalGames,
      totalVictories,
    } = this;

    this.goalsFavor = goalsFavor + awayTeamGoals;
    this.goalsOwn = goalsOwn + homeTeamGoals;
    this.totalPoints = totalPoints + 3;
    this.totalGames = totalGames + 1;
    this.totalVictories = totalVictories + 1;
  }

  private setDraw(homeTeamGoals: number, awayTeamGoals: number) {
    // Update leaderboard for a draw
    const {
      goalsFavor,
      goalsOwn,
      totalPoints,
      totalGames,
      totalDraws,
    } = this;

    this.goalsFavor = goalsFavor + awayTeamGoals;
    this.goalsOwn = goalsOwn + homeTeamGoals;
    this.totalPoints = totalPoints + 1;
    this.totalGames = totalGames + 1;
    this.totalDraws = totalDraws + 1;
  }

  private setLoss(homeTeamGoals: number, awayTeamGoals: number) {
    // Update leaderboard for a loss
    const {
      goalsFavor,
      goalsOwn,
      totalGames,
      totalLosses,
    } = this;

    this.goalsFavor = goalsFavor + awayTeamGoals;
    this.goalsOwn = goalsOwn + homeTeamGoals;
    this.totalGames = totalGames + 1;
    this.totalLosses = totalLosses + 1;
  }

  public returnPointsAway(MatchI: MatchI[]) {
    // Calculate total points for home matches
    MatchI.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (awayTeamGoals > homeTeamGoals) this.setVictory(homeTeamGoals, awayTeamGoals);
      if (homeTeamGoals === awayTeamGoals) this.setDraw(homeTeamGoals, awayTeamGoals);
      if (awayTeamGoals < homeTeamGoals) this.setLoss(homeTeamGoals, awayTeamGoals);
    });
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      // Calculate goals balance and efficiency
      goalsBalance: this.goalsFavor - this.goalsOwn,
      efficiency: ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2) };
  }
}
