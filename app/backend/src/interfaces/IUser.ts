export interface ILoginInfo {
  email: string,
  password: string,
}

export interface IRole {
  role: string,
}

export interface IUser extends ILoginInfo, IRole{
  id: number | number,
  username: string
}
