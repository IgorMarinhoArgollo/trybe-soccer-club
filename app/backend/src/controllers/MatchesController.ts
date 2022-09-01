import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/MatchService ';
import MatchModel from '../models/MatchModel';

export default abstract class MatchesController {
  static async updateScore(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      if (!homeTeamGoals || !awayTeamGoals) {
        return res.status(400).json({ message: 'Invalid Field' });
      }
      const result = await new MatchService(new MatchModel())
        .updateScore(id, homeTeamGoals, awayTeamGoals);
      if (result) {
        return res.status(200).json({ message: 'Score Updated' });
      }
      return res.status(400).json({ message: 'Match not Found' });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await new MatchService(new MatchModel())
        .updateStatus(id);
      if (result) {
        return res.status(200).json({ message: 'Finished' });
      }
      return res.status(400).json({ message: 'Match not found' });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;
      if (inProgress) {
        if (inProgress === 'true') {
          const result = await new MatchService(new MatchModel())
            .getByStatus(true);
          return res.status(200).json(result);
        }
        const result = await new MatchService(new MatchModel())
          .getByStatus(false);
        return res.status(200).json(result);
      }
      const result = await new MatchService(new MatchModel()).getMatches();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async createMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const matchInfo = req.body;
      if (!matchInfo.awayTeam || !matchInfo.homeTeam) {
        return res.status(400).json({ message: 'Invalid Fields' });
      }
      const result = await new MatchService(new MatchModel()).createMatch(matchInfo);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}
