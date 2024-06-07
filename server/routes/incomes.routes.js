import * as IncomesController from "../controllers/incomes.controller.js";
import { userRequeried } from "../middlewares/user.middlewares.js";
import { Router } from "express";

const router = Router();

// router.post("/income", userRequeried, IncomesController.createIncome); //create income
// router.get("/incomes", userRequeried, IncomesController.getAllIncomes); // get all incomes
// router.get("/incomes/:id", userRequeried, IncomesController.getIncome); // get income
// router.put("/incomes/:id", userRequeried, IncomesController.updateIncome); // update income
// router.delete("/incomes/:id", userRequeried, IncomesController.deleteIncome); // delete income

router.post("/income", IncomesController.createIncome); //create income
router.get("/incomes", IncomesController.getAllIncomes); // get all incomes
router.get("/incomes/:id", IncomesController.getIncome); // get income
router.put("/incomes/:id", IncomesController.updateIncome); // update income
router.delete("/incomes/:id", IncomesController.deleteIncome); // delete income

export default router;
