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

// import * as UserService from "../services/user.services.js";
// import express from "express";

// const router = express.Router();

// router.post("/create", (req, res) => {
//   const { name, email, password } = req.body;

//   UserService.createUser(name, email, password, (err, result) => {
//     if (err) {
//       console.log(err.message);
//     } else {
//       res.send("usuario registrado con exito");
//     }
//   });
// });

// router.get("/userExists", (req, res) => {
//   const email = req.query.email;

//   UserService.userExists(email, (err, result) => {
//     if (err) {
//       console.log(err.message);
//       res.send(false);
//     } else {
//       res.send(result.length > 0);
//     }
//   });
// });

// router.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   UserService.loginUser(email, password, (err, result) => {
//     if (err) {
//       console.log(err.message);
//       res
//         .status(500)
//         .json({ success: false, message: "Error al iniciar sesión" });
//     } else {
//       if (result.length > 0) {
//         res
//           .status(200)
//           .json({ success: true, message: "Inicio de sesión exitoso" });
//       } else {
//         res.status(400).json({
//           success: false,
//           message: "Usuario no encontrado o contraseña incorrecta",
//         });
//       }
//     }
//   });
// });

// export default router;
