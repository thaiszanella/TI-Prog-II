"use strict";
module.exports = (sequelize, DataTypes) => {
  const Evento = sequelize.define(
    "Evento",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      pacoteId: { type: DataTypes.INTEGER, allowNull: false },
      clienteId: { type: DataTypes.INTEGER, allowNull: false },
      dataHora: { type: DataTypes.DATE, allowNull: false },
      funcionarios: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
      },
      equipamentos: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      status: {
        type: DataTypes.ENUM("agendado", "finalizado", "cancelado"),
        defaultValue: "agendado",
      },
      pontosAtribuidos: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: "eventos",
      schema: "public",
      freezeTableName: true,
      timestamps: true,
    },
  );

  Evento.associate = function (models) {
    Evento.belongsTo(models.Cliente, { foreignKey: "clienteId", as: "cliente" });
    Evento.belongsTo(models.Pacote, { foreignKey: "pacoteId", as: "pacote" });
    Evento.hasMany(models.ContaReceber, { foreignKey: "eventoId", as: "contasReceber" });
    Evento.hasMany(models.Historico, { foreignKey: "eventoId", as: "historicos" });
    Evento.hasMany(models.Sugestao, { foreignKey: "eventoId", as: "sugestoes" });
  };

  return Evento;
};
