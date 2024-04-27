import db from "../database/connection.js";
import express from "express";

//IMPLEMENTACIÓN DE TODAS LAS RUTAS RELACIONADAS CON USERS

const router = express.Router();
// Este objeto tiene métodos para las rutas de manejo de solicitudes HTTP como get, post, put, delete.

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

export default router;
