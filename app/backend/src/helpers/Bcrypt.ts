import * as bcrypt from 'bcryptjs';

export default abstract class Bcrypt {
  static generate(password: string) {
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  static verify(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}
