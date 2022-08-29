import ITeam from './ITeam';
import { IRole, IUser } from './IUser';
import { IMatch, IMatchComplete, IMatchInfo } from './IMatch';

export interface ILoginModel {
  findUser(email: string): Promise<IUser | null>;
  findRole(email: string): Promise<IRole | null>;
}

export interface ITeamModel {
  findAll(): Promise<ITeam[]>;
  findById(id: number): Promise<ITeam | null>;
}

export interface IMatchModel {
  getByStatus(status: boolean): Promise<IMatchComplete[]>;
  updateStatus(id: number | string): Promise<void>;
  getMatches(): Promise<IMatchComplete[]>;
  createMatch(matchInfo: IMatchInfo): Promise<IMatch>;
  getById(id: number | string): Promise<boolean>;
  updateScore(
    id: number | string,
    homeGoals: number | string,
    awayGoals: number | string): Promise<boolean>
}
