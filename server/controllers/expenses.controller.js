import * as expensesService from "../services/expenses.services.js";

// Create expense
export async function createExpense(req, res) {
  const user_id = req.usuario.id;
  const { title, description, amount, category_id } = req.body;
  try {
    const newExpense = await expensesService.createExpense(
      title,
      description,
      amount,
      user_id,
      category_id
    );
    res.json(newExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get all expenses
export async function getAllExpenses(req, res) {
  const user_id = req.usuario.id;
  try {
    const expenses = await expensesService.getAllExpenses(user_id);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get expense
export async function getExpense(req, res) {
  const user_id = req.usuario.id;
  const { id } = req.body;
  try {
    const expense = await expensesService.getExpense(user_id, id);
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// update expense
export async function updateExpense(req, res) {
  const user_id = req.usuario.id;
  const {id} = req.params;
  const { title, description, amount } = req.body;
  try {
    const expenseUpdate = await expensesService.updateExpense(
      id,
      user_id,
      title,
      description,
      amount
    );
    res.json(expenseUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete expense
export async function deleteExpense(req, res) {
  const user_id = req.usuario.id;
  const { id } = req.params;
  try {
    await expensesService.deleteExpense(id, user_id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
