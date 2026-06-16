"use strict";
module.exports = (sequelize, DataTypes) => {
  const Servico = sequelize.define(
    "Servico",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nome: { type: DataTypes.STRING(100), allowNull: false },
      descricao: { type: DataTypes.STRING(250), allowNull: true },
      valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      notaFiscal: { type: DataTypes.STRING(250), allowNull: true },
    },
    {
      tableName: "servicos",
      schema: "public",
      freezeTableName: true,
      timestamps: true,
    },
  );

  return Servico;
};
