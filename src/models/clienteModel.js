"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define(
    "Cliente",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nome: { type: DataTypes.STRING(100), allowNull: false },
      email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
      cpf: { type: DataTypes.STRING(14), allowNull: false, unique: true },
      telefone: { type: DataTypes.STRING(20), allowNull: false },
    },
    {
      tableName: "clientes",
      schema: "public",
      freezeTableName: true,
      timestamps: true,
    },
  );

  Cliente.associate = function (models) {
    Cliente.hasMany(models.Evento, { foreignKey: "clienteId", as: "eventos" });
    Cliente.hasMany(models.ContaReceber, { foreignKey: "clienteId", as: "contasReceber" });
    Cliente.hasMany(models.Historico, { foreignKey: "clienteId", as: "historicos" });
    Cliente.hasOne(models.Fidelidade, { foreignKey: "clienteId", as: "fidelidade" });
  };

  return Cliente;
};
