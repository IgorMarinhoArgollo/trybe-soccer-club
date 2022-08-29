import { Router } from 'express';
import LoginController from '../controllers/LoginController';

export default class LoginRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.loginController();
  }

  protected loginController(): void {
    this.router.get('/validate', LoginController.getRole);
    this.router.post('/', LoginController.postLogin);
  }
}
