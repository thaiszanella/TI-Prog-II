"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("servicos", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nome: { type: Sequelize.STRING(100), allowNull: false },
      descricao: { type: Sequelize.STRING(250), allowNull: true },
      valor: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      notaFiscal: { type: Sequelize.STRING(250), allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("servicos");
  },
};
