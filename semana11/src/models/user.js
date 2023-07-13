const { STRING, DATE } = require('sequelize')
const { connection } = require('../database/connection')

const User = connection.define("user", {
  name: {
    type: STRING,
    allowNull: false
  },
  email: {
    type: STRING,
    unique: {
      msg: "Este e-mail já está cadastrado."
    }
  },
  password: STRING,
}, { underscored: true })

module.exports = { User }