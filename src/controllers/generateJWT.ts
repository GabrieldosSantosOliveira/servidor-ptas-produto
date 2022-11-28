import { sign } from 'jsonwebtoken';
export const generateJWT = (params: object) => {
  return sign(params, process.env.SECRET as string, {
    expiresIn: 60 // 60 seconds
  });
};
