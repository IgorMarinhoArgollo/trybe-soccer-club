import { ILoginModel } from '../interfaces/IModels';
import { IRole, IUser } from '../interfaces/IUser';
import User from '../database/models/user';

export default class LoginModel implements ILoginModel {
  private user = User;
  async findUser(email: string): Promise<IUser | null> {
    return (await this.user.findOne({
      where: { email },
    }))?.get({ plain: true }) as IUser;
  }

  async findRole(email: string): Promise<IRole | null> {
    return (await this.user.findOne({
      where: { email },
      attributes: {
        exclude: ['id', 'username', 'email', 'password'],
      },
    }))?.get({ plain: true }) as IRole;
  }
}
