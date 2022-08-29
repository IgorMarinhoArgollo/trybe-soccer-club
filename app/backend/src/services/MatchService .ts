import Err from '../middlewares/Err';
import { IMatchService } from '../interfaces/IServices';
import { IMatchModel } from '../interfaces/IModels';
import { IMatch, IMatchComplete, IMatchInfo } from '../interfaces/IMatch';
import TeamModel from '../models/TeamModel';

export default class MatchService implements IMatchService {
  constructor(
    private matchModel: IMatchModel,
  ) { }

  async getByStatus(status: boolean): Promise<IMatchComplete[]> {
    const result = await this.matchModel.getByStatus(status);
    return result;
  }

  async updateStatus(id: number | string): Promise<boolean> {
    if (await this.matchModel.getById(id)) {
      await this.matchModel.updateStatus(id);
      return true;
    }
    return false;
  }

  async getMatches(): Promise<IMatchComplete[]> {
    const result = await this.matchModel.getMatches();
    return result;
  }

  async createMatch(matchInfo: IMatchInfo): Promise<IMatch> {
    if (matchInfo.awayTeam === matchInfo.homeTeam) {
      throw new Err(401, 'It is not possible to create a match with two equal teams');
    }
    const home = await new TeamModel().findById(matchInfo.homeTeam);
    const away = await new TeamModel().findById(matchInfo.awayTeam);
    if (!home || !away) {
      throw new Err(404, 'There is no team with such id!');
    }
    const result = await this.matchModel.createMatch(matchInfo);
    return result;
  }

  async updateScore(
    id: number | string,
    homeGoals: number | string,
    awayGoals: number | string,
  ): Promise<boolean> {
    const result = await this.matchModel.updateScore(id, homeGoals, awayGoals);
    return result;
  }
}
