import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/TeamService';
import TeamModel from '../models/TeamModel';

export default abstract class TeamController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await new TeamService(new TeamModel()).getTeams();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await new TeamService(new TeamModel()).getTeam(Number(id));
      if (result) {
        return res.status(200).json(result);
      }
      return res.status(400).json({ mesdage: 'Team Not Found' });
    } catch (error) {
      next(error);
    }
  }
}
