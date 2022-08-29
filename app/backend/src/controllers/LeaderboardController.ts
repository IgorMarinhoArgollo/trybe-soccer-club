import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';

export default abstract class LeaderboardController {
  static async getHome(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await
      new LeaderboardService(new TeamModel(), new MatchModel()).getHome();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getAway(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await
      new LeaderboardService(new TeamModel(), new MatchModel()).getAway();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await
      new LeaderboardService(new TeamModel(), new MatchModel()).getAll();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
