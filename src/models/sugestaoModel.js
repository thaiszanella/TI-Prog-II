"use strict";
module.exports = (sequelize, DataTypes) => {
  const Sugestao = sequelize.define(
    "Sugestao",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      eventoId: { type: DataTypes.INTEGER, allowNull: false },
      usuarioId: { type: DataTypes.INTEGER, allowNull: false },
      descricao: { type: DataTypes.TEXT, allowNull: false },
      dataCriacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "sugestoes",
      schema: "public",
      freezeTableName: true,
      timestamps: true,
    },
  );

  Sugestao.associate = function (models) {
    Sugestao.belongsTo(models.Evento, { foreignKey: "eventoId", as: "evento" });
    Sugestao.belongsTo(models.Usuario, { foreignKey: "usuarioId", as: "usuario" });
  };

  return Sugestao;
};
