const { STRING, DATE } = require('sequelize');
const { connection } = require('../database/connection');

const Company = connection.define("company", {
  cnpj: STRING,
  companyName: STRING,
  contact: STRING,
  cep: STRING,
  address: STRING,
  neighborhood: STRING,
  city: STRING,
  state: STRING,
  number: STRING,
  complement: {
    type: STRING,
    allowNull: true
  },
  rhAnalystName: STRING,
  supervisorName: STRING,
  createdAt: DATE,
  updatedAt: DATE,
}, { underscored: true, paranoid: true })

module.exports = { Company }