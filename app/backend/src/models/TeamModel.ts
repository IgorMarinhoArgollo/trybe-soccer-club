import { ITeamModel } from '../interfaces/IModels';
import ITeam from '../interfaces/ITeam';
import Team from '../database/models/team';

export default class TeamModel implements ITeamModel {
  private team = Team;
  async findAll(): Promise<ITeam[]> {
    return (await this.team.findAll({ raw: true })) as ITeam[];
  }

  async findById(id: number): Promise<ITeam | null> {
    return (await this.team.findByPk(id))?.get({ plain: true });
  }
}
