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

// import db from "../database/connection.js";

// export function createUser(userDto) {
//   db.query("INSERT INTO usuarios(name, email, password) VALUES(?,?,?)", [
//     userDto.name,
//     userDto.email,
//     userDto.password,
//   ]);
// }

// export function userExists(email) {
//   db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
// }

// export function loginUser(userDto) {
//   db.query("SELECT * FROM usuarios WHERE email = ? AND password = ?", [
//     userDto.email,
//     userDto.password,
//   ]);
// }
