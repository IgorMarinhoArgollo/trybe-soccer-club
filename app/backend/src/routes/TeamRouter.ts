import { Router } from 'express';
import TeamController from '../controllers/TeamController';

export default class TeamRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.teamRouter();
  }

  protected teamRouter(): void {
    this.router.get('/', TeamController.getAll);
    this.router.get('/:id', TeamController.getById);
  }
}
