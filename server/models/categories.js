import sequelize from "../database/connection.js";
import { DataTypes } from "sequelize";
import { Usuario } from "./User.js";

export const Categoria = sequelize.define(
  "Categoria",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_category: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    createdAT: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario, // Referencia al modelo Usuario
        key: "id", // La clave foránea se vincula con el campo 'id' del modelo Usuario
      },
      onDelete: "CASCADE", // Si se elimina el Usuario, se eliminarán todas sus Categorias
    },
  },
  {
    tableName: "categorias",
    timestamps: false,
  }
);
