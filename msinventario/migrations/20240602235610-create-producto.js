'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo: {
        type: Sequelize.STRING
      },
      espesor: {
        type: Sequelize.FLOAT
      },
      ancho: {
        type: Sequelize.FLOAT
      },
      largo: {
        type: Sequelize.FLOAT
      },
      cantidad: {
        type: Sequelize.INTEGER
      },
      cantidad_pies: {
        type: Sequelize.FLOAT
      },
      estado: {
        type: Sequelize.STRING
      },
      cantidad_ingresada: {
        type: Sequelize.INTEGER
      },
      romaneoId: {
        type: Sequelize.INTEGER
      },
      especieId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Productos');
  }
};