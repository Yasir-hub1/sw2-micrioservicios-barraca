'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Romaneos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha_registro: {
        type: Sequelize.DATE
      },
      fecha_entrega: {
        type: Sequelize.DATE
      },
      descripcion: {
        type: Sequelize.STRING
      },
      total_pie_cuadrado: {
        type: Sequelize.FLOAT
      },
      estado: {
        type: Sequelize.STRING
      },
      tipo_romaneo: {
        type: Sequelize.STRING
      },
      cantidad_productos: {
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
    await queryInterface.dropTable('Romaneos');
  }
};