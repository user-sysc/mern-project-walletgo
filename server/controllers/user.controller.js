import * as UserService from "../services/user.services.js";
import { Usuario } from "../models/User.js";
import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await UserService.createUser(name, email, password);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogueado = await UserService.signin(email, password);
    res.cookie("token", userLogueado.token);
    res.json(userLogueado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const validationToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await Usuario.findByPk(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json(userFound);
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    await UserService.deleteUser(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export async function getUserByEmail(req, res) {
//   const { email } = req.params;
//   try {
//     const user = await UserService.getUserByEmail(email);
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// export async function getUsuarios(req, res) {
//   try {
//     const users = await UserService.getUsers();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// export async function updateUsuario(req, res) {
//   const { idUser } = req.params;
//   const { name, email, password } = req.body;
//   try {
//     const user = await UserService.updateUser(idUser, name, email, password);
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// export async function deleteUsuario(req, res) {
//   const { idUser } = req.params;
//   try {
//     await UserService.deleteUser(idUser);
//     res.sendStatus(204);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }
