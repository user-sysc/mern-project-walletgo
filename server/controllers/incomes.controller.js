import * as IncomeService from "../services/incomes.services.js";

export async function createIncome(req, res) {
  const { title, amount, description, createdAT, user_id, category_id } =
    req.body;
  try {
    const newIncome = await IncomeService.createIncome(
      title,
      amount,
      description,
      createdAT,
      user_id,
      category_id
    );
    res.json(newIncome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getIncomeById(req, res) {
  const { id } = req.params;
  try {
    const income = await IncomeService.getIncomeById(id);
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getIncomes(req, res) {
  try {
    const incomes = await IncomeService.getAllIncomes();
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateIncome(req, res) {
  const { id } = req.params;
  const { title, amount, description, createdAT, user_id, category_id } =
    req.body;
  try {
    const income = await IncomeService.updateIncome(
      id,
      title,
      amount,
      description,
      createdAT,
      user_id,
      category_id
    );
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteIncome(req, res) {
  const { id } = req.params;
  try {
    await IncomeService.deleteIncome(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
