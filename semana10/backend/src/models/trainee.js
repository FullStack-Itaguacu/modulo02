const { STRING, DATE, BOOLEAN } = require('sequelize');
const { connection } = require('../database/connection');

const Trainee = connection.define("trainee", {
  name: {
    type: STRING,
  },
  // email: {
  //   validate: {
  //     isEmail: {
  //       msg: "O campo enviado deve ser um e-mail."
  //     }
  //   }
  // }
  email: STRING,
  rg: {
    type: STRING,
    validate: {
      len: {
        args: [7, 20],
        msg: "O Rg deve ter no mínimo 7 dígitos"
      }
    },
    unique: {
      msg: "Este campo rg já está na aplicação"
    }
  },
  cpf: {
    type: STRING,
    validate: {
      len: {
        args: [11, 11],
        msg: "Este campo deve ter exatamente 11 caracteres."
      }
    },
    unique: {
      msg: "Este campo cpf já está na aplicação"
    }
  },
  primaryPhoneContact: STRING,
  secondaryPhoneContact: {
    type: STRING,
    allowNull: true
  },
  dateBirth: DATE,
  fatherName: STRING,
  motherName: STRING,
  haveSpecialNeeds: BOOLEAN,
  createdAt: DATE,
  updatedAt: DATE,
}, { underscored: true, paranoid: true })

module.exports = { Trainee }
