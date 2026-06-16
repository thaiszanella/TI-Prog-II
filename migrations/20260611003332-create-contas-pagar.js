"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("contas_pagar", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      descricao: { type: Sequelize.STRING(250), allowNull: false },
      valor: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      dataEmissao: { type: Sequelize.DATEONLY, allowNull: false },
      dataVencimento: { type: Sequelize.DATEONLY, allowNull: false },
      status: {
        type: Sequelize.ENUM("pendente", "pago", "cancelado"),
        defaultValue: "pendente",
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("contas_pagar");
  },
};
