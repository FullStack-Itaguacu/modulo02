const { connection } = require('../database/connection');
const { STRING, DATE } = require('sequelize');

const Category = connection.define("Category", {
  name: STRING,
  created_at: DATE,
  updated_at: DATE,
});

module.exports = {
  Category
}