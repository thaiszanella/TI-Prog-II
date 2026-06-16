"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("fidelidade", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      clienteId: { type: Sequelize.INTEGER, allowNull: false, unique: true },
      pontos: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      historico: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("fidelidade");
  },
};
