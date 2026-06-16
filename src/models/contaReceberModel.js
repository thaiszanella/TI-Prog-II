"use strict";
module.exports = (sequelize, DataTypes) => {
  const ContaReceber = sequelize.define(
    "ContaReceber",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      eventoId: { type: DataTypes.INTEGER, allowNull: true },
      clienteId: { type: DataTypes.INTEGER, allowNull: false },
      valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      dataEmissao: { type: DataTypes.DATEONLY, allowNull: false },
      dataVencimento: { type: DataTypes.DATEONLY, allowNull: false },
      status: {
        type: DataTypes.ENUM("pendente", "pago", "cancelado"),
        defaultValue: "pendente",
      },
    },
    {
      tableName: "contas_receber",
      schema: "public",
      freezeTableName: true,
      timestamps: true,
    },
  );

  ContaReceber.associate = function (models) {
    ContaReceber.belongsTo(models.Evento, {
      foreignKey: "eventoId",
      as: "evento",
    });
    ContaReceber.belongsTo(models.Cliente, {
      foreignKey: "clienteId",
      as: "cliente",
    });
  };

  return ContaReceber;
};
