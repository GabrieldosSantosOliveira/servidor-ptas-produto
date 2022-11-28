import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
config();
export const Auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Authorization = req.headers.authorization;
    console.log(Authorization);
    if (!Authorization)
      return res
        .status(401)
        .json({ message: 'Header is required' });
    const twoParts = Authorization.split(' ');
    if (twoParts.length !== 2)
      return res
        .status(401)
        .json({ message: 'Header is required two parts ' });
    const [bearer, token] = twoParts;

    if (bearer !== 'Bearer')
      return res
        .status(401)
        .json({ message: 'Bearer is missing' });
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Token is missing' });
    }
    verify(token, process.env.SECRET as string, err => {
      if (err) {
        return res
          .status(401)
          .json({ message: 'Access denied' });
      }
      return next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Access denied' });
  }
};
