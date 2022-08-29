import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import Err from '../middlewares/Err';
import { ILoginInfo } from '../interfaces/IUser';
import LoginService from '../services/LoginService';
import LoginModel from '../models/LoginModel';

dotenv.config();

export default abstract class LoginController {
  static async postLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as ILoginInfo;
      if (!email || !password) {
        throw new Err(400, 'All fields must be filled');
      }
      const result = await new LoginService(new LoginModel()).login(email, password);
      if (!result) {
        throw new Err(401, 'Incorrect email or password');
      }
      return res.status(200).json({
        token: jwt.sign({ email }, process.env.JWT_SECRET || 'jwt_secret', { expiresIn: '7d' }),
      });
    } catch (error) {
      next(error);
    }
  }

  static async getRole(req: Request, res: Response, _next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Err(501, 'Token not Found');
    }
    const result = await new LoginService(new LoginModel()).getRole(authorization);
    return res.status(200).json(result);
  }
}
