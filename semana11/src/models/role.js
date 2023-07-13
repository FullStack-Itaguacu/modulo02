const { STRING } = require('sequelize')
const { connection } = require('../database/connection')

const Role = connection.define('role', {
  description: STRING
}, {underscored: true})

module.exports = { Role }