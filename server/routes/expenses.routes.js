import { Router } from "express";
import * as ExpensesController from "../controllers/expenses.controller.js";

const router = Router();

// Configura el router para manejar una solicitud GET a la ruta '/expenses'
// Cuando se recibe una solicitud a esta ruta, se llama a la función getExpenses
router.get("/expenses", ExpensesController.getExpenses);

// Configura el router para manejar una solicitud GET a la ruta '/expenses/:id'
// Cuando se recibe una solicitud a esta ruta, se llama a la función getExpenseById
router.get("/expenses/:id", ExpensesController.getExpenseById);

// Configura el router para manejar una solicitud POST a la ruta '/expenses'
// Cuando se recibe una solicitud a esta ruta, se llama a la función createExpense
router.post("/expenses", ExpensesController.createExpense);

// Configura el router para manejar una solicitud PUT a la ruta '/expenses/:id'
// Cuando se recibe una solicitud a esta ruta, se llama a la función updateExpense
router.put("/expenses/:id", ExpensesController.updateExpense);

// Configura el router para manejar una solicitud DELETE a la ruta '/expenses/:id'
// Cuando se recibe una solicitud a esta ruta, se llama a la función deleteExpense
router.delete("/expenses/:id", ExpensesController.deleteExpense);

// Exportamos para que pueda ser utilizado en otros archivos
export default router;
