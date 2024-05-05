import { Router } from "express";
import * as IncomesController from "../controllers/incomes.controller.js";

const router = Router();

// Configura el router para manejar una solicitud GET a la ruta '/incomes'
// Cuando se recibe una solicitud a esta ruta, se llama a la función getIncomes
router.get("/incomes", IncomesController.getIncomes);

// Configura el router para manejar una solicitud GET a la ruta '/incomes/:id'
// Cuando se recibe una solicitud a esta ruta, se llama a la función getIncomeById
router.get("/incomes/:id", IncomesController.getIncomeById);

// Configura el router para manejar una solicitud POST a la ruta '/incomes'
// Cuando se recibe una solicitud a esta ruta, se llama a la función createIncome
router.post("/incomes", IncomesController.createIncome);

// Configura el router para manejar una solicitud PUT a la ruta '/incomes/:id'
// Cuando se recibe una solicitud a esta ruta, se llama a la función updateIncome
router.put("/incomes/:id", IncomesController.updateIncome);

// Configura el router para manejar una solicitud DELETE a la ruta '/incomes/:id'
// Cuando se recibe una solicitud a esta ruta, se llama a la función deleteIncome
router.delete("/incomes/:id", IncomesController.deleteIncome);

// Exportamos para que pueda ser utilizado en otros archivos
export default router;
