import sequelize from "../database/connection.js";
import { DataTypes } from "sequelize";
import { Categoria } from "./categories.js";
import { Usuario } from "./User.js";

export const Ingreso = sequelize.define(
  "Ingreso",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAT: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Categoria,
        key: "id",
      },
      onDelete: "SET NULL",
    },
  },
  {
    tableName: "ingresos",
    timestamps: false,
  }
);
