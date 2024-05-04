import sequelize from "../database/connection.js";
import { DataTypes } from "sequelize";

export const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(200),
    },
    email: {
      type: DataTypes.STRING(200),
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);
