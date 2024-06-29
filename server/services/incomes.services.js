import { Ingreso } from "../models/incomes.js";
import { IncomesDTO } from "../DTO/incomes.dto.js";

// Create Income
export async function createIncome(
  title,
  description,
  amount,
  user_id,
  category_id
) {
  try {
    const newIncome = await Ingreso.create({
      title,
      description,
      amount,
      user_id,
      category_id,
    });
    return new IncomesDTO(
      newIncome.id,
      newIncome.title,
      newIncome.description,
      newIncome.amount,
      newIncome.createdAT,
      newIncome.user_id,
      newIncome.category_id
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get all incomes
export async function getAllIncomes(user_id) {
  try {
    const incomes = await Ingreso.findAll({
      where: {
        user_id,
      },
    });
    return incomes.map(
      (incomes) =>
        new IncomesDTO(
          incomes.id,
          incomes.title,
          incomes.description,
          incomes.amount,
          incomes.createdAT,
          incomes.user_id,
          incomes.category_id
        )
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

// get income
export async function getIncome(id, user_id) {
  try {
    const income = await Ingreso.findOne({
      where: {
        id,
        user_id,
      },
    });
    if (income) {
      return new IncomesDTO(
        income.id,
        income.title,
        income.description,
        income.amount,
        income.createdAT,
        income.user_id,
        income.category_id
      );
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

// Update income
export async function updateIncome(id, user_id, title, description, amount, category_id) {
  try {
    const income = await Ingreso.findOne({
      where: {
        id,
        user_id,
      },
    });
    income.title = title;
    income.description = description;
    income.amount = amount;
    income.category_id = category_id;
    await income.save();
    return new IncomesDTO(
      income.id,
      income.title,
      income.description,
      income.amount,
      income.createdAT,
      income.user_id,
      income.category_id
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

// Delete income
export async function deleteIncome(id, user_id) {
  try {
    await Ingreso.destroy({
      where: {
        id,
        user_id,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
