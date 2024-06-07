import axios from "../axios";

export const getIncomeRequest = () => axios.get("/incomes");
export const getIncomesRequest = (id) => axios.get(`/incomes/${id}`);
export const createIncomeRequest = (Income) => axios.post("/incomes", Income);
export const deleteIncomeRequest = (id) => axios.delete(`/incomes/${id}`);
export const updateIncomeRequest = (id, Income) =>
  axios.put(`/incomes/${id}`, Income);
