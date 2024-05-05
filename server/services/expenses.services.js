import { Expense } from "../models/expenses.js";
import { ExpenseDto } from "../DTO/expenses.dto.js";

export async function createExpense(expenseData) {
  try {
    const newExpense = await Expense.create(expenseData);
    return new ExpenseDto(
      newExpense.id,
      newExpense.title,
      newExpense.description,
      newExpense.createdAT,
      newExpense.user_id,
      newExpense.category_id
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getExpenseById(id) {
  try {
    const expense = await Expense.findByPk(id);
    if (expense) {
      return new ExpenseDto(
        expense.id,
        expense.title,
        expense.description,
        expense.createdAT,
        expense.user_id,
        expense.category_id
      );
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getExpenses() {
  try {
    const expenses = await Expense.findAll();
    return expenses.map(
      (expense) =>
        new ExpenseDto(
          expense.id,
          expense.title,
          expense.description,
          expense.createdAT,
          expense.user_id,
          expense.category_id
        )
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateExpense(id, expenseData) {
  try {
    const expense = await Expense.findByPk(id);
    if (expense) {
      Object.assign(expense, expenseData);
      await expense.save();
      return new ExpenseDto(
        expense.id,
        expense.title,
        expense.description,
        expense.createdAT,
        expense.user_id,
        expense.category_id
      );
    } else {
      throw new Error("Expense not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteExpense(id) {
  try {
    await Expense.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
