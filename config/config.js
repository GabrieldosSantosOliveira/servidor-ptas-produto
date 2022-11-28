const { env } = require('./configEnv');

module.exports = {
  dialect: env.DB_DIALECT,
  host: env.DB_HOST,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  port: env.DB_PORT,
  define: {
    timestamps: true
  }
};
