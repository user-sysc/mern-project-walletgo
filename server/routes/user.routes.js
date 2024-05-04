import { Router } from "express";
import * as UserController from "../controllers/user.controller.js";

const router = Router();

// Configura el router para manejar una solicitud GET a la ruta '/usuarios'
// Cuando se recibe una solicitud a esta ruta, se llama a la función getUsuarios
router.get("/usuarios", UserController.getUsuarios);

// Configura el router para manejar una solicitud GET a la ruta '/usuarios/:email'
// Cuando se recibe una solicitud a esta ruta, se llama a la función getUsuario
router.get("/usuarios/:email", UserController.getUserByEmail);

// Configura el router para manejar una solicitud POST a la ruta '/usuarios'
// Cuando se recibe una solicitud a esta ruta, se llama a la función createUsuario
router.post("/usuarios", UserController.createUsuario);

// Configura el router para manejar una solicitud PUT a la ruta '/usuarios/:idUsuario'
// Cuando se recibe una solicitud a esta ruta, se llama a la función updateUsuario
router.put("/usuarios/:idUsuario", UserController.updateUsuario);

// Configura el router para manejar una solicitud DELETE a la ruta '/usuarios/:idUsuario'
// Cuando se recibe una solicitud a esta ruta, se llama a la función deleteUsuario
router.delete("/usuarios/:idUsuario", UserController.deleteUsuario);

// Exportamos para que pueda ser utilizado en otros archivos
export default router;
