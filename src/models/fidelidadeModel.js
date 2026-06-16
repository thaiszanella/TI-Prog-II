"use strict";
module.exports = (sequelize, DataTypes) => {
  const Fidelidade = sequelize.define(
    "Fidelidade",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      clienteId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
      pontos: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      historico: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      tableName: "fidelidade",
      schema: "public",
      freezeTableName: true,
      timestamps: true,
    },
  );

  Fidelidade.associate = function (models) {
    Fidelidade.belongsTo(models.Cliente, {
      foreignKey: "clienteId",
      as: "cliente",
    });
  };

  return Fidelidade;
};
