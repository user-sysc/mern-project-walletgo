import * as ExpensesService from "../services/expenses.services.js";

export async function getExpenses(req, res, next) {
  try {
    const expenses = await ExpensesService.getExpenses();
    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
}

export async function getExpenseById(req, res, next) {
  try {
    const expense = await ExpensesService.getExpenseById(req.params.id);
    if (expense) {
      res.status(200).json(expense);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
}

export async function createExpense(req, res, next) {
  try {
    const expense = await ExpensesService.createExpense(req.body);
    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
}

export async function updateExpense(req, res, next) {
  try {
    const updatedExpense = await ExpensesService.updateExpense(
      req.params.id,
      req.body
    );
    if (updatedExpense) {
      res.status(200).json(updatedExpense);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
}

export async function deleteExpense(req, res, next) {
  try {
    await ExpensesService.deleteExpense(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
