import { Request, Response, NextFunction } from 'express';
import LoginModel from '../models/LoginModel';
import LoginService from '../services/LoginService';

export default abstract class TokenMiddleware {
  static async auth(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({ message: 'Token not Found' });
      }
      await new LoginService(new LoginModel()).getRole(authorization);
      next();
    } catch (error) {
      next(error);
    }
  }
}
