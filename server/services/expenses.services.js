import { Egreso } from "../models/expenses.js";
import { ExpensesDTO } from "../DTO/expenses.dto.js";

// Create expense
export async function createExpense(
  title,
  description,
  amount,
  user_id,
  category_id
) {
  try {
    const newExpense = await Egreso.create({
      title,
      description,
      amount,
      user_id,
      category_id,
    });
    return new ExpensesDTO(
      newExpense.id,
      newExpense.title,
      newExpense.description,
      newExpense.amount,
      newExpense.createdAT,
      newExpense.user_id,
      newExpense.category_id
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get all expenses
export async function getAllExpenses(user_id) {
  try {
    const expenses = await Egreso.findAll({
      where: {
        user_id,
      },
    });
    return expenses.map(
      (expenses) =>
        new ExpensesDTO(
          expenses.id,
          expenses.title,
          expenses.description,
          expenses.amount,
          expenses.createdAT,
          expenses.user_id,
          expenses.category_id
        )
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

// get expense
export async function getExpense(id, user_id) {
  try {
    const expense = await Egreso.findOne({
      where: {
        id,
        user_id,
      },
    });
    if (expense) {
      return new ExpensesDTO(
        expense.id,
        expense.title,
        expense.description,
        expense.amount,
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

// Update expense
export async function updateExpense(id, user_id, title, description, amount) {
  try {
    const expense = await Egreso.findOne({
      where: {
        id,
        user_id,
      },
    });
    expense.title = title;
    expense.description = description;
    expense.amount = amount;
    await expense.save();
    return new ExpensesDTO(
      expense.id,
      expense.title,
      expense.description,
      expense.amount,
      expense.createdAT,
      expense.user_id,
      expense.category_id
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

// Delete expense
export async function deleteExpense(id, user_id) {
  try {
    await Egreso.destroy({
      where: {
        id,
        user_id,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
