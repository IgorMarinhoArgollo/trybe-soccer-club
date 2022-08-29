import { ITeamService } from '../interfaces/IServices';
import { ITeamModel } from '../interfaces/IModels';
import ITeam from '../interfaces/ITeam';

export default class TeamService implements ITeamService {
  constructor(
    private teamModel: ITeamModel,
  ) { }

  async getTeams(): Promise<ITeam[]> {
    const result = await this.teamModel.findAll();
    return result;
  }

  async getTeam(id: number): Promise<ITeam | null> {
    const result = await this.teamModel.findById(id);
    if (!result) {
      return null;
    }
    return result;
  }
}
