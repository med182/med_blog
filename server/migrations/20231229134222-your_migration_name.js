"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "confirmationToken", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Users", "isConfirmed", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "confirmationToken");
    await queryInterface.removeColumn("Users", "isConfirmed");
  },
};
