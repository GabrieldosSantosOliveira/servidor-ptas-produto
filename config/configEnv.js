const { config } = require('dotenv');
const { resolve } = require('path');
switch (__dirname.includes('dist')) {
  case true:
    config({
      path: resolve(
        __dirname,
        '..',
        '..',
        `.env.${process.env.NODE_ENV ?? 'development'}`
      )
    });
    break;
  case false:
    config({
      path: resolve(
        __dirname,
        '..',
        `.env.${process.env.NODE_ENV ?? 'development'}`
      )
    });
    break;
}

const env = {
  PORT: process.env.PORT,
  DB_DIALECT: process.env.DB_DIALECT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  DB_FOLDER: process.env.DB_FOLDER
};
module.exports = { env };
