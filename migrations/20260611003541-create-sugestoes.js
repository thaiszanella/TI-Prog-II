"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sugestoes", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      eventoId: { type: Sequelize.INTEGER, allowNull: false },
      usuarioId: { type: Sequelize.INTEGER, allowNull: false },
      descricao: { type: Sequelize.TEXT, allowNull: false },
      dataCriacao: { type: Sequelize.DATE, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("sugestoes");
  },
};
