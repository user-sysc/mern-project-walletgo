import { createContext, useContext, useState } from "react";
import {
  createExpenseRequest,
  getExpenseRequest,
  deleteExpenseRequest,
  updateExpenseRequest,
} from "../api/expense/expenseAuth";

const ExpenseContext = createContext();

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense ya esta usado");
  }
  return context;
};

export function ExpenseProvider({ children }) {
  const [expenses, setExpense] = useState([]);

  const getExpense = async () => {
    try {
      const res = await getExpenseRequest();
      setExpense(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createExpense = async (Expense) => {
    const res = await createExpenseRequest(Expense);
    console.log(res);
  };

  const deleteExpense = async (id) => {
    try {
      const res = await deleteExpenseRequest(id);
      if (res.status == 204)
        setExpense(expenses.filter((Expense) => Expense.id != id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateExpense = async (id, Expense) => {
    try {
      await updateExpenseRequest(id, Expense);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        createExpense,
        deleteExpense,
        updateExpense,
        getExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}
