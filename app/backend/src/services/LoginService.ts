import { IRole, IUser } from '../interfaces/IUser';
import { ILoginService } from '../interfaces/IServices';
import { ILoginModel } from '../interfaces/IModels';
import Bcrypt from '../helpers/Bcrypt';
import Jwt from '../helpers/Jwt';
import Err from '../middlewares/Err';
import IJwtAuth from '../interfaces/IJwtAuth';

export default class LoginService implements ILoginService {
  constructor(
    private loginModel: ILoginModel,
  ) { }

  async login(email: string, password: string): Promise<IUser | null> {
    const result = await this.loginModel.findUser(email);
    if (result && Bcrypt.verify(password, result.password)) {
      return result;
    }
    return null;
  }

  async getRole(authorization: string): Promise<IRole> {
    const email = await Jwt.auth(authorization) as unknown as IJwtAuth;
    if (!email) {
      throw new Err(501, 'Not implemented');
    }
    const result = await this.loginModel.findRole(email.email);
    if (!result) {
      throw new Err(501, 'Not Implemented');
    }
    return result;
  }
}
