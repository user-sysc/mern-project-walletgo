import { Ingreso } from "../models/incomes.js";
import { IncomesDto } from "../DTO/incomes.dto.js";

export async function createIncome(
  title,
  amount,
  description,
  createdAT,
  user_id,
  category_id
) {
  try {
    const newIncome = await Ingreso.create({
      title,
      amount,
      description,
      createdAT,
      user_id,
      category_id,
    });
    return new IncomeDto(
      newIncome.id,
      newIncome.title,
      newIncome.amount,
      newIncome.description,
      newIncome.createdAT,
      newIncome.user_id,
      newIncome.category_id
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getIncomeById(id) {
  try {
    const income = await Ingreso.findByPk(id);
    if (income) {
      return new IncomeDto(
        income.id,
        income.title,
        income.amount,
        income.description,
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

export async function getAllIncomes() {
  try {
    const incomes = await Ingreso.findAll();
    return incomes.map(
      (income) =>
        new IncomeDto(
          income.id,
          income.title,
          income.amount,
          income.description,
          income.createdAT,
          income.user_id,
          income.category_id
        )
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateIncome(
  id,
  title,
  amount,
  description,
  createdAT,
  user_id,
  category_id
) {
  try {
    const income = await Ingreso.findByPk(id);
    if (income) {
      income.title = title;
      income.amount = amount;
      income.description = description;
      income.createdAT = createdAT;
      income.user_id = user_id;
      income.category_id = category_id;
      await income.save();
      return new IncomeDto(
        income.id,
        income.title,
        income.amount,
        income.description,
        income.createdAT,
        income.user_id,
        income.category_id
      );
    } else {
      throw new Error("Income not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteIncome(id) {
  try {
    await Ingreso.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
