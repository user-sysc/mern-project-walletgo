import sequelize from "../database/connection.js";
import { DataTypes } from "sequelize";

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
  },
  {
    tableName: "categorias",
    timestamps: false,
  }
);
