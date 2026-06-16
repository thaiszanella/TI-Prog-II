"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("equipamentos", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nome: { type: Sequelize.STRING(100), allowNull: false },
      descricao: { type: Sequelize.STRING(250), allowNull: true },
      fornecedor: { type: Sequelize.STRING(100), allowNull: true },
      valorLocacao: { type: Sequelize.DECIMAL(10, 2), allowNull: true },
      quantidade: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("equipamentos");
  },
};
