require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.USER_DEV,
    "password": process.env.PASSWORD_DEV,
    "database": process.env.DB_DEV,
    "host": process.env.HOST_DEV,
    "port": process.env.PORT_DEV,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.USER_TEST,
    "password": process.env.PASSWORD_TEST,
    "database": process.env.DB_TEST,
    "host": process.env.HOST_TEST,
    "port": process.env.PORT_TEST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.USER_PRODUCTION,
    "password": process.env.PASSWORD_PRODUCTION,
    "database": process.env.DB_PRODUCTION,
    "host": process.env.HOST_PRODUCTION,
    "port": process.env.PORT_PRODUCTION,
    "dialect": "mysql"
  }
}
