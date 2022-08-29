import { Model, DataTypes } from 'sequelize';
import db from '.';
import Team from './team';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Match.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: 'home_team',
    },
    homeTeamGoals: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: 'home_team_goals',
    },
    awayTeam: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: 'away_team',
    },
    awayTeamGoals: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: 'away_team_goals',
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'in_progress',
    },
  },
  {
    sequelize: db,
    modelName: 'Match',
    tableName: 'matches',
    underscored: true,
    timestamps: false },
);

Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'teamAway' });
Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'teamHome' });

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
