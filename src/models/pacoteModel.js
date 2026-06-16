"use strict";
module.exports = (sequelize, DataTypes) => {
  const Pacote = sequelize.define(
    "Pacote",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nome: { type: DataTypes.STRING(100), allowNull: false },
      descricao: { type: DataTypes.STRING(250), allowNull: true },
      servicos: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      tableName: "pacotes",
      schema: "public",
      freezeTableName: true,
      timestamps: true,
    },
  );

  Pacote.associate = function (models) {
    Pacote.hasMany(models.Evento, { foreignKey: "pacoteId", as: "eventos" });
  };

  return Pacote;
};
