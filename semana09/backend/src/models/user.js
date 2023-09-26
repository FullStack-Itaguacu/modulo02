const { STRING, DATE } = require('sequelize');
const { connection } = require('../database/connection');

const User = connection.define("user", {
  name: {
    type: STRING,
  },
  email: STRING,
  password: STRING,
  createdAt: DATE,
  updatedAt: DATE,
}, { underscored: true, paranoid: true })

module.exports = { User }
