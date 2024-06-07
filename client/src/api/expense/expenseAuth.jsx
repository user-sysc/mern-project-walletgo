import axios from "../axios";

export const getExpenseRequest = () => axios.get("/expenses");
export const getExpensesRequest = (id) => axios.get(`/expenses/${id}`);
export const createExpenseRequest = (Expense) =>
  axios.post("/expenses", Expense);
export const deleteExpenseRequest = (id) => axios.delete(`/expenses/${id}`);
export const updateExpenseRequest = (id, Expense) =>
  axios.put(`/expenses/${id}`, Expense);
