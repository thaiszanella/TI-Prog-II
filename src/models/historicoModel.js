"use strict";
module.exports = (sequelize, DataTypes) => {
  const Historico = sequelize.define(
    "Historico",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      eventoId: { type: DataTypes.INTEGER, allowNull: false },
      clienteId: { type: DataTypes.INTEGER, allowNull: false },
      funcionarioId: { type: DataTypes.INTEGER, allowNull: false },
      dataHora: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      tipoServico: { type: DataTypes.STRING(100), allowNull: false },
      valorTotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      percentualEmpresa: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 50,
      },
      percentualFuncionario: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      valorEmpresa: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      valorFuncionario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    },
    {
      tableName: "historico",
      schema: "public",
      freezeTableName: true,
      timestamps: true,
    },
  );

  Historico.associate = function (models) {
    Historico.belongsTo(models.Evento, {
      foreignKey: "eventoId",
      as: "evento",
    });
    Historico.belongsTo(models.Cliente, {
      foreignKey: "clienteId",
      as: "cliente",
    });
    Historico.belongsTo(models.Usuario, {
      foreignKey: "funcionarioId",
      as: "funcionario",
    });
  };

  return Historico;
};
