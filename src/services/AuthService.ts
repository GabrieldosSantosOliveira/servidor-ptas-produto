import { hashSync } from 'bcrypt';
import dayjs from 'dayjs';

import { generateJWT } from '../controllers/generateJWT';
import { RefreshToken, User } from './../../models';
interface IFindRefreshToken {
  id: string;
  userId: string;
}
interface IUserCreate {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}
interface IUserLogin {
  password: string;
  identifier: string;
}
interface IGenerateTokenAndRefreshToken {
  id: string;
}
interface IRegenerateTokenWithRefreshToken {
  userId: string;
  expiresIn: number;
}
export class AuthService {
  static async createUser({
    email,
    firstName,
    lastName,
    password
  }: IUserCreate) {
    const passwordHash = hashSync(password, 10);
    await User.create({
      firstName,
      lastName,
      email,
      password: passwordHash
    });
  }
  static async login({ identifier }: IUserLogin) {
    const userFound = await User.findOne({
      where: {
        email: identifier
      }
    });
    if (!userFound)
      return new Error(
        'Password or identifier is incorrect'
      );
    return userFound;
  }
  static async generateTokenAndRefreshToken({
    id
  }: IGenerateTokenAndRefreshToken) {
    const token = generateJWT({
      id
    });
    await RefreshToken.destroy({
      where: {
        userId: id
      }
    });
    const expiresIn = dayjs().add(15, 'days').unix();
    const refreshToken = await RefreshToken.create({
      userId: id,
      expiresIn
    });
    return { token, refreshToken };
  }
  static async findRefreshToken({
    id,
    userId
  }: IFindRefreshToken) {
    const refreshTokenExist = await RefreshToken.findOne({
      where: {
        id,
        userId
      }
    });
    if (!refreshTokenExist) {
      return new Error('Refresh token not found');
    }
    return refreshTokenExist;
  }
  static async regenerateTokenWithRefreshToken({
    expiresIn,
    userId
  }: IRegenerateTokenWithRefreshToken) {
    const isExpires = dayjs().isAfter(
      dayjs.unix(expiresIn)
    );
    if (isExpires)
      return new Error('Refresh token expired');

    const token = generateJWT({
      id: userId
    });
    return token;
  }
}
