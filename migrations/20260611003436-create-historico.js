"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("historico", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      eventoId: { type: Sequelize.INTEGER, allowNull: false },
      clienteId: { type: Sequelize.INTEGER, allowNull: false },
      funcionarioId: { type: Sequelize.INTEGER, allowNull: false },
      dataHora: { type: Sequelize.DATE, allowNull: false },
      tipoServico: { type: Sequelize.STRING(100), allowNull: false },
      valorTotal: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      percentualEmpresa: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 50,
      },
      percentualFuncionario: { type: Sequelize.DECIMAL(5, 2), allowNull: false },
      valorEmpresa: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      valorFuncionario: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("historico");
  },
};
