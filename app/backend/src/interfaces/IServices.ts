import { IMatch, IMatchComplete, IMatchInfo } from './IMatch';
import { IRanking } from './IRanking';
import ITeam from './ITeam';
import { IRole, IUser } from './IUser';

export interface ILoginService {
  login(email: string, password: string): Promise<IUser | null>;
  getRole(authorization: string): Promise<IRole | null>;
}

export interface ITeamService {
  getTeams(): Promise<ITeam[]>;
  getTeam(id: number): Promise<ITeam | null>
}

export interface IMatchService {
  getByStatus(status: boolean): Promise<IMatchComplete[]>;
  updateStatus(id: number | string): Promise<boolean>;
  getMatches(): Promise<IMatchComplete[]>;
  createMatch(matchInfo: IMatchInfo): Promise<IMatch>;
  updateScore(
    id: number | string,
    homeGoals: number | string,
    awayGoals: number | string,
  ): Promise<boolean>
}

export interface ILeaderboardService {
  getHome(): Promise<IRanking[]>;
  getAway(): Promise<IRanking[]>;
  getAll(): Promise<IRanking[]>;
  getTeams(): Promise<void>;
  getMatches(): Promise<void>;
  createTeams(): void;
  getHomeGoals(): void;
  getHomePoints(): void;
  updateEfficiency(): void;
  sort(): void;
}
