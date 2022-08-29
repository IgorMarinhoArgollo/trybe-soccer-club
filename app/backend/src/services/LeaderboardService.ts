import { ITeamModel, IMatchModel } from '../interfaces/IModels';
import { IRanking } from '../interfaces/IRanking';
import { ILeaderboardService } from '../interfaces/IServices';
import { IMatchComplete } from '../interfaces/IMatch';
import ITeam from '../interfaces/ITeam';

export default class LeaderboardService implements ILeaderboardService {
  teams: ITeam[];
  matches: IMatchComplete[];
  result: IRanking[];

  constructor(
    private teamModel: ITeamModel,
    private matchModel: IMatchModel,
  ) {
    this.result = [];
  }

  createTeams(): void {
    for (let index = 0; index <= this.teams.length - 1; index += 1) {
      this.result.push({
        name: this.teams[index].teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0,

      });
    }
  }

  getHomeGoals(): void {
    this.teams.forEach((team, index) => {
      this.matches.forEach((match) => {
        if (match.inProgress === false && match.homeTeam === team.id) {
          this.result[index].totalGames = Number(this.result[index].totalGames) + 1;
          this.result[index].goalsFavor = Number(this.result[index].goalsFavor)
            + Number(match.homeTeamGoals);
          this.result[index].goalsOwn = Number(this.result[index].goalsOwn)
            + Number(match.awayTeamGoals);
          this.result[index].goalsBalance = Number(this.result[index].goalsFavor)
            - Number(this.result[index].goalsOwn);
        }
      });
    });
  }

  getHomePoints(): void {
    this.teams.forEach((team, index) => {
      this.matches.forEach((match) => {
        if (match.inProgress === false && match.homeTeam === team.id) {
          if (Number(match.homeTeamGoals) > Number(match.awayTeamGoals)) {
            this.result[index].totalVictories = Number(this.result[index].totalVictories) + 1;
            this.result[index].totalPoints = Number(this.result[index].totalPoints) + 3;
          }
          if (Number(match.homeTeamGoals) === Number(match.awayTeamGoals)) {
            this.result[index].totalDraws = Number(this.result[index].totalDraws) + 1;
            this.result[index].totalPoints = Number(this.result[index].totalPoints) + 1;
          }
          if (Number(match.homeTeamGoals) < Number(match.awayTeamGoals)) {
            this.result[index].totalLosses = Number(this.result[index].totalLosses) + 1;
          }
        }
      });
    });
  }

  getAwayGoals(): void {
    this.teams.forEach((team, index) => {
      this.matches.forEach((match) => {
        if (match.inProgress === false && match.awayTeam === team.id) {
          this.result[index].totalGames = Number(this.result[index].totalGames) + 1;
          this.result[index].goalsFavor = Number(this.result[index].goalsFavor)
            + Number(match.awayTeamGoals);
          this.result[index].goalsOwn = Number(this.result[index].goalsOwn)
            + Number(match.homeTeamGoals);
          this.result[index].goalsBalance = Number(this.result[index].goalsFavor)
            - Number(this.result[index].goalsOwn);
        }
      });
    });
  }

  getAwayPoints(): void {
    this.teams.forEach((team, index) => {
      this.matches.forEach((match) => {
        if (match.inProgress === false && match.awayTeam === team.id) {
          if (Number(match.homeTeamGoals) < Number(match.awayTeamGoals)) {
            this.result[index].totalVictories = Number(this.result[index].totalVictories) + 1;
            this.result[index].totalPoints = Number(this.result[index].totalPoints) + 3;
          }
          if (Number(match.homeTeamGoals) === Number(match.awayTeamGoals)) {
            this.result[index].totalDraws = Number(this.result[index].totalDraws) + 1;
            this.result[index].totalPoints = Number(this.result[index].totalPoints) + 1;
          }
          if (Number(match.homeTeamGoals) > Number(match.awayTeamGoals)) {
            this.result[index].totalLosses = Number(this.result[index].totalLosses) + 1;
          }
        }
      });
    });
  }

  updateEfficiency(): void {
    for (let index = 0; index <= this.teams.length - 1; index += 1) {
      this.result[index].efficiency = Number((Number(this.result[index].totalPoints)
        / (Number(this.result[index].totalGames) * 3)) * 100).toFixed(2);
    }
  }

  sort(): void {
    this.result.sort((a, b) => Number(b.totalPoints) - Number(a.totalPoints)
    || Number(b.totalVictories) - Number(a.totalVictories)
    || Number(b.goalsBalance) - Number(a.goalsBalance)
    || Number(b.goalsFavor) - Number(a.goalsFavor)
    || Number(b.goalsOwn) - Number(a.goalsOwn));
  }

  async getTeams(): Promise<void> {
    const result = await this.teamModel.findAll();
    this.teams = result;
  }

  async getMatches(): Promise<void> {
    const result = await this.matchModel.getMatches();
    this.matches = result;
  }

  async getHome(): Promise<IRanking[]> {
    await this.getMatches();
    await this.getTeams();
    this.createTeams();
    this.getHomeGoals();
    this.getHomePoints();
    this.updateEfficiency();
    this.sort();
    return this.result;
  }

  async getAway(): Promise<IRanking[]> {
    await this.getMatches();
    await this.getTeams();
    this.createTeams();
    this.getAwayGoals();
    this.getAwayPoints();
    this.updateEfficiency();
    this.sort();
    return this.result;
  }

  async getAll(): Promise<IRanking[]> {
    await this.getMatches();
    await this.getTeams();
    this.createTeams();
    this.getHomeGoals();
    this.getHomePoints();
    this.getAwayGoals();
    this.getAwayPoints();
    this.updateEfficiency();
    this.sort();
    return this.result;
  }
}
