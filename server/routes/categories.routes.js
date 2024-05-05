import { Router } from "express";
import * as CategoriesController from "../controllers/categories.controller.js";

const router = Router();

// Configura el router para manejar una solicitud GET a la ruta '/categories'
// Cuando se recibe una solicitud a esta ruta, se llama a la función getCategories
router.get("/categories", CategoriesController.getCategories);

// Configura el router para manejar una solicitud GET a la ruta '/categories/:id'
// Cuando se recibe una solicitud a esta ruta, se llama a la función getCategoryById
router.get("/categories/:id", CategoriesController.getCategoryById);

// Configura el router para manejar una solicitud POST a la ruta '/categories'
// Cuando se recibe una solicitud a esta ruta, se llama a la función createCategory
router.post("/categories", CategoriesController.createCategory);

// Configura el router para manejar una solicitud PUT a la ruta '/categories/:id'
// Cuando se recibe una solicitud a esta ruta, se llama a la función updateCategory
router.put("/categories/:id", CategoriesController.updateCategory);

// Configura el router para manejar una solicitud DELETE a la ruta '/categories/:id'
// Cuando se recibe una solicitud a esta ruta, se llama a la función deleteCategory
router.delete("/categories/:id", CategoriesController.deleteCategory);

// Exportamos para que pueda ser utilizado en otros archivos
export default router;
