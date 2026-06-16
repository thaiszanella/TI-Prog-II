"use strict";
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nome: { type: DataTypes.STRING(100), allowNull: false },
      email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
      cpf: { type: DataTypes.STRING(14), allowNull: false, unique: true },
      cep: { type: DataTypes.STRING(10), allowNull: false },
      dataNascimento: { type: DataTypes.DATEONLY, allowNull: false },
      telefone: { type: DataTypes.STRING(20), allowNull: false },
      areaAtuacao: { type: DataTypes.STRING(100), allowNull: false },
      senha: { type: DataTypes.STRING(250), allowNull: false },
      tipo: {
        type: DataTypes.ENUM("administrador", "funcionario"),
        defaultValue: "funcionario",
      },
      status: {
        type: DataTypes.ENUM("ativo", "congelado", "inativo"),
        defaultValue: "ativo",
      },
      foto: { type: DataTypes.STRING(250), allowNull: true },
    },
    {
      tableName: "usuarios",
      schema: "public",
      freezeTableName: true,
      timestamps: true,
    },
  );

  Usuario.associate = function (models) {
    Usuario.hasMany(models.Historico, { foreignKey: "funcionarioId", as: "historicos" });
    Usuario.hasMany(models.Sugestao, { foreignKey: "usuarioId", as: "sugestoes" });
  };

  return Usuario;
};
