"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("eventos", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      pacoteId: { type: Sequelize.INTEGER, allowNull: false },
      clienteId: { type: Sequelize.INTEGER, allowNull: false },
      dataHora: { type: Sequelize.DATE, allowNull: false },
      funcionarios: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
        defaultValue: [],
      },
      equipamentos: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      status: {
        type: Sequelize.ENUM("agendado", "finalizado", "cancelado"),
        defaultValue: "agendado",
      },
      pontosAtribuidos: { type: Sequelize.INTEGER, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("eventos");
  },
};
