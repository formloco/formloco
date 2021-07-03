const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

module.exports = function loadConfig() {
  if (process.env.NODE_ENV === "dev") {
    process.env.DBUSER = process.env.DEV_DBUSER,
    process.env.HOST = process.env.DEV_HOST,
    process.env.PORT = process.env.DEV_PORT,
    process.env.PASSWORD = process.env.DEV_PASSWORD,
    process.env.SECRET = process.env.DEV_SECRET,
    process.env.SWAGGER_SERVER = process.env.DEV_SWAGGER_SERVER
  }
  if (process.env.NODE_ENV === "prod") {
    process.env.DBUSER = process.env.PROD_DBUSER,
    process.env.HOST = process.env.PROD_HOST,
    process.env.PORT = process.env.PROD_PORT,
    process.env.PASSWORD = process.env.PROD_PASSWORD,
    process.env.SECRET = process.env.PROD_SECRET,
    process.env.SWAGGER_SERVER = process.env.PROD_SWAGGER_SERVER
  }
  
}
