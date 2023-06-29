const { connection } = require('../database/connection');
const { STRING, DATE } = require('sequelize');

const Category = connection.define("category", {
  name: STRING,
  createdAt: DATE,
  updatedAt: DATE,
},
{ underscored: true, paranoid: true });

module.exports = {
  Category
}