const { config } = require('dotenv');
const { resolve } = require('path');

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
