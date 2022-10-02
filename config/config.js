require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3002,
  dbUrl: process.env.DATABASE_URL,
  dbUrlMySql: process.env.DATABASE_URL_MYSQL,
}

module.exports = { config };
