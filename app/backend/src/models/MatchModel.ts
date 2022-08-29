import { IMatchModel } from '../interfaces/IModels';
import Match from '../database/models/match';
import { IMatch, IMatchComplete, IMatchInfo } from '../interfaces/IMatch';
import Team from '../database/models/team';

export default class MatchModel implements IMatchModel {
  private match = Match;
  private team = Team;

  async getByStatus(status: boolean): Promise<IMatchComplete[]> {
    return (await this.match.findAll(
      {
        where: { inProgress: status },
        include: [
          { model: this.team, as: 'teamHome', attributes: ['teamName'] },
          { model: this.team, as: 'teamAway', attributes: ['teamName'] },
        ],
      },
    )) as IMatchComplete[] | [];
  }

  async updateStatus(id: number | string): Promise<void> {
    await this.match.update({ inProgress: false }, { where: { id } });
  }

  async getMatches(): Promise<IMatchComplete[]> {
    return (await this.match.findAll({
      include: [
        { model: this.team, as: 'teamHome', attributes: ['teamName'] },
        { model: this.team, as: 'teamAway', attributes: ['teamName'] },
      ] }) as IMatchComplete[] | []);
  }

  async createMatch(matchInfo: IMatchInfo): Promise<IMatch> {
    return (await this.match.create({ ...matchInfo, inProgress: true }))
      ?.get({ plain: true }) as IMatch;
  }

  async getById(id: number | string): Promise<boolean> {
    if (await this.match.findByPk(id)) {
      return true;
    }
    return false;
  }

  async updateScore(
    id: string | number,
    homeGoals: string | number,
    awayGoals: string | number,
  ): Promise<boolean> {
    if (await this.getById(id)) {
      await this.match.update({
        homeTeamGoals: homeGoals,
        awayTeamGoals: awayGoals,
      }, { where: { id } });
      return true;
    }
    return false;
  }
}
