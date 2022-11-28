import { compareSync } from 'bcrypt';
import { Request, Response } from 'express';

import { validateBodyRefreshToken } from '../model/Auth/RefreshToken';
import { AuthService } from '../services/AuthService';
import { validateBodyUser } from './../model/Auth/CreateUser';
import { loginBodyValidate } from './../model/Auth/LoginBodyValidate';

class Auth {
  static async create(req: Request, res: Response) {
    try {
      const { email, firstName, lastName, password } =
        validateBodyUser.parse(req.body);
      await AuthService.createUser({
        email,
        password,
        firstName,
        lastName
      });
      res.status(201).json({
        message: 'User created successfully'
      });
    } catch (error) {
      res.status(400).json({
        message: error
      });
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const { password, identifier } =
        loginBodyValidate.parse(req.body);
      const userFound = await AuthService.login({
        password,
        identifier
      });
      if (userFound instanceof Error)
        return res
          .status(400)
          .json({ message: userFound.message });

      const passwordIsValid = compareSync(
        password,
        userFound.password
      );
      if (!passwordIsValid) {
        return res.status(400).json({
          message: 'Password or identifier is incorrect'
        });
      }

      const { token, refreshToken } =
        await AuthService.generateTokenAndRefreshToken({
          id: userFound.id
        });
      return res.send({
        token,
        refreshToken
      });
    } catch (error) {
      res.status(400).json({
        message: error
      });
    }
  }
  static async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken, id } =
        validateBodyRefreshToken.parse(req.body);

      const refreshTokenExist =
        await AuthService.findRefreshToken({
          id: refreshToken,
          userId: id
        });
      if (refreshTokenExist instanceof Error)
        return res
          .status(400)
          .json({ message: refreshTokenExist.message });
      const token =
        await AuthService.regenerateTokenWithRefreshToken({
          expiresIn: refreshTokenExist.expiresIn,
          userId: refreshTokenExist.userId
        });
      if (token instanceof Error)
        return res
          .status(400)
          .json({ message: token.message });
      return res.send({
        token
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error
      });
    }
  }
}
export { Auth };
