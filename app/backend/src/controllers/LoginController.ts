import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { ILoginInfo } from '../interfaces/IUser';
import LoginService from '../services/LoginService';
import LoginModel from '../models/LoginModel';

dotenv.config();

export default abstract class LoginController {
  static async postLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as ILoginInfo;
      if (!email || !password) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }
      const result = await new LoginService(new LoginModel()).login(email, password);
      if (!result) { return res.status(401).json({ message: 'Incorrect email or password' }); }
      return res.status(200).json({
        token: `Bearer ${jwt.sign(
          { email },
          process.env.JWT_SECRET || 'jwt_secret',
          { expiresIn: '7d' },
        )}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({ message: 'Token not Found' });
      }
      const result = await new LoginService(new LoginModel()).getRole(authorization);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
