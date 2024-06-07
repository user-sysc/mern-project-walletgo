import * as incomesService from "../services/incomes.services.js";

// Create income
export async function createIncome(req, res) {
  const { title, description, amount, user_id, category_id } = req.body;
  try {
    const newIncome = await incomesService.createIncome(
      title,
      description,
      amount,
      user_id,
      category_id
    );
    res.json(newIncome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get all incomes
export async function getAllIncomes(req, res) {
  const { user_id } = req.body;
  try {
    const incomes = await incomesService.getAllIncomes(user_id);
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get income
export async function getIncome(req, res) {
  const { id, user_id } = req.body;
  try {
    const income = await incomesService.getIncome(user_id, id);
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// update income
export async function updateIncome(req, res) {
  const { id, title, description, amount, user_id } = req.body;
  try {
    const incomeUpdate = await incomesService.updateIncome(
      id,
      user_id,
      title,
      description,
      amount
    );
    res.json(incomeUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete income
export async function deleteIncome(req, res) {
  const { id, user_id } = req.body;
  try {
    await incomesService.deleteIncome(id, user_id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
