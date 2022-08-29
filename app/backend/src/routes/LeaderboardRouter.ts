import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

export default class LeaderboardRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.leaderboardRouter();
  }

  protected leaderboardRouter(): void {
    this.router.get('/home', LeaderboardController.getHome);
    this.router.get('/away', LeaderboardController.getAway);
    this.router.get('/', LeaderboardController.getAll);
  }
}
