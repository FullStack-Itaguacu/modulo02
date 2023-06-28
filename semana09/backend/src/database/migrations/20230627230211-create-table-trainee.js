'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trainees', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rg: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      primary_phone_contact: {
        type: Sequelize.STRING,
        allowNull: false
      },
      secondary_phone_contact: {
        type: Sequelize.STRING,
        allowNull: true
      },
      date_birth: {
        type: Sequelize.DATE,
        allowNull: false
      },
      father_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mother_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      have_special_needs: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('trainees');
  }
};
