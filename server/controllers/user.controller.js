import * as UserService from "../services/user.services.js";

export async function createUsuario(req, res) {
  const { name, email, password } = req.body;
  try {
    const newUser = await UserService.createUser(name, email, password);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getUserByEmail(req, res) {
  const { email } = req.params;
  try {
    const user = await UserService.getUserByEmail(email);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getUsuarios(req, res) {
  try {
    const users = await UserService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateUsuario(req, res) {
  const { idUser } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await UserService.updateUser(idUser, name, email, password);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteUsuario(req, res) {
  const { idUser } = req.params;
  try {
    await UserService.deleteUser(idUser);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
