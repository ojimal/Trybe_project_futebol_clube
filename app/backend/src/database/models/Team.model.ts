import { Model, DataTypes } from 'sequelize';
import db from '.';

export interface MatchI {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export default class Team extends Model {
  declare id: number;
  declare teamName: string;
  declare homeTeam: MatchI[];
  declare awayTeam: MatchI[];
}

Team.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  tableName: 'teams',
  sequelize: db,
  timestamps: false,
  underscored: true,
});
