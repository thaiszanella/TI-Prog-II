"use strict";
module.exports = (sequelize, DataTypes) => {
  const Equipamento = sequelize.define(
    "Equipamento",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nome: { type: DataTypes.STRING(100), allowNull: false },
      descricao: { type: DataTypes.STRING(250), allowNull: true },
      fornecedor: { type: DataTypes.STRING(100), allowNull: true },
      valorLocacao: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
      quantidade: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "equipamentos",
      schema: "public",
      freezeTableName: true,
      timestamps: true,
    },
  );

  return Equipamento;
};
