const { config } = require('dotenv')
config()

const { DIALECT, USERNAMEDB, PASSWORDDB, DATABASE, PORT, HOST } = process.env

module.exports = {
  dialect: DIALECT,
  username: USERNAMEDB,
  password: PASSWORDDB,
  database: DATABASE,
  port: PORT,
  host: HOST,
  define: {
    underscoredAll:true
  }
}