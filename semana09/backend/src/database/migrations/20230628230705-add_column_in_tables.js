'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('categories', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true
    })

    await queryInterface.addColumn('trainees', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('categories', 'deleted_at')
    await queryInterface.removeColumn('trainees', 'deleted_at')
  }
};
