"use strict";
module.exports = (sequelize, DataTypes) => {
  const ContaPagar = sequelize.define(
    "ContaPagar",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      descricao: { type: DataTypes.STRING(250), allowNull: false },
      valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      dataEmissao: { type: DataTypes.DATEONLY, allowNull: false },
      dataVencimento: { type: DataTypes.DATEONLY, allowNull: false },
      status: {
        type: DataTypes.ENUM("pendente", "pago", "cancelado"),
        defaultValue: "pendente",
      },
    },
    {
      tableName: "contas_pagar",
      schema: "public",
      freezeTableName: true,
      timestamps: true,
    },
  );

  return ContaPagar;
};
