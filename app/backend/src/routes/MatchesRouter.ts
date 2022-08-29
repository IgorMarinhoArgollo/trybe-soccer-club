import { Router } from 'express';
import TokenMiddleware from '../middlewares/TokenMiddleware';
import MatchesController from '../controllers/MatchesController';

export default class MatchesRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.matchesRouter();
  }

  protected matchesRouter(): void {
    this.router.patch('/:id/finish', MatchesController.updateStatus);
    this.router.patch('/:id', MatchesController.updateScore);
    this.router.get('/', MatchesController.getAll);
    this.router.post('/', TokenMiddleware.auth, MatchesController.createMatch);
  }
}
