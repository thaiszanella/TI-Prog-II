"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("usuarios", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nome: { type: Sequelize.STRING(100), allowNull: false },
      email: { type: Sequelize.STRING(150), allowNull: false, unique: true },
      cpf: { type: Sequelize.STRING(14), allowNull: false, unique: true },
      cep: { type: Sequelize.STRING(10), allowNull: false },
      dataNascimento: { type: Sequelize.DATEONLY, allowNull: false },
      telefone: { type: Sequelize.STRING(20), allowNull: false },
      areaAtuacao: { type: Sequelize.STRING(100), allowNull: false },
      senha: { type: Sequelize.STRING(250), allowNull: false },
      tipo: {
        type: Sequelize.ENUM("administrador", "funcionario"),
        defaultValue: "funcionario",
      },
      status: {
        type: Sequelize.ENUM("ativo", "congelado", "inativo"),
        defaultValue: "ativo",
      },
      foto: { type: Sequelize.STRING(250), allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("usuarios");
  },
};
