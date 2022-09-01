import * as jwt from 'jsonwebtoken';
import Err from '../middlewares/Err';

export default abstract class Jwt {
  static async auth(token: string): Promise<string | undefined> {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret') as string;
    } catch (error) {
      throw new Err(401, 'Token must be a valid token');
    }
  }
}
