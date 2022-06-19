require('dotenv').config()
module.exports = {
    "development": {
      "user": process.env.USER_DEV,
      "password": process.env.PASSWORD_DEV,
      "database": process.env.DB_DEV,
      "host": process.env.HOST_DEV,
      "port": process.env.PORT_DEV
    },
    "test": {
      "user": process.env.USER_TEST,
      "password": process.env.PASSWORD_TEST,
      "database": process.env.DB_TEST,
      "host": process.env.HOST_TEST,
      "port": process.env.PORT_TEST
    },
    "production": {
      "user": process.env.USER_PROD,
      "password": process.env.PASSWORD_PROD,
      "database": process.env.DB_PROD,
      "host": process.env.HOST_PROD,
      "port": process.env.PORT_PROD
    }
  }