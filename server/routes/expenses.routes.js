import * as ExpensesController from "../controllers/expenses.controller.js";
import { userRequeried } from "../middlewares/user.middlewares.js";
import { Router } from "express";

const router = Router();

// router.post("/expense", userRequeried, ExpensesController.createExpense); //create expense
// router.get("/expenses", userRequeried, ExpensesController.getAllExpenses); // get all expenses
// router.get("/expenses/:id", userRequeried, ExpensesController.getExpense); // get expense
// router.put("/expenses/:id", userRequeried, ExpensesController.updateExpense); // update expense
// router.delete("/expenses/:id", userRequeried, ExpensesController.deleteExpense); // delete expense

router.post("/expense", ExpensesController.createExpense); //create expense
router.get("/expenses", ExpensesController.getAllExpenses); // get all expenses
router.get("/expenses/:id", ExpensesController.getExpense); // get expense
router.put("/expenses/:id", ExpensesController.updateExpense); // update expense
router.delete("/expenses/:id", ExpensesController.deleteExpense); // delete expense

export default router;
