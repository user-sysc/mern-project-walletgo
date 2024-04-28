import db from "../database/connection.js";
import express from "express";

//IMPLEMENTACIÓN DE TODAS LAS RUTAS RELACIONADAS CON USERS

const router = express.Router();
// Este objeto tiene métodos para las rutas de manejo de solicitudes HTTP como get, post, put, delete.

// Endpoint para crear un nuevo usuario
// Este endpoint recibe un nombre, correo electrónico y contraseña en el cuerpo de la solicitud
// Luego inserta estos datos en la tabla de usuarios en la base de datos
router.post("/create", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "INSERT INTO usuarios(name, email, password) VALUES(?,?,?)",
    [name, email, password],
    (err, result) => {
      if (err) {
        console.log(err.message);
      } else {
        res.send("usuario registrado con exito");
      }
    }
  );
});

// Endpoint para verificar si un usuario existe
// Este endpoint recibe un correo electrónico como parámetro de consulta
// Luego busca en la tabla de usuarios en la base de datos si existe un usuario con ese correo electrónico
router.get("/userExists", (req, res) => {
  const email = req.query.email;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.log(err.message);
      res.send(false);
    } else {
      if (result.length > 0) {
        res.send(true);
      } else {
        res.send(false);
      }
    }
  });
});

// Endpoint para iniciar sesión
// Este endpoint recibe un correo electrónico y una contraseña en el cuerpo de la solicitud
// Luego busca en la tabla de usuarios en la base de datos si existe un usuario con ese correo electrónico y contraseña
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM usuarios WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err.message);
        res
          .status(500)
          .json({ success: false, message: "Error al iniciar sesión" });
      } else {
        if (result.length > 0) {
          res
            .status(200)
            .json({ success: true, message: "Inicio de sesión exitoso" });
        } else {
          res.status(400).json({
            success: false,
            message: "Usuario no encontrado o contraseña incorrecta",
          });
        }
      }
    }
  );
});

export default router;
