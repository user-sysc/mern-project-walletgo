import { createContext, useContext, useState } from "react";
import {
  createIncomeRequest,
  getIncomeRequest,
  deleteIncomeRequest,
  updateIncomeRequest,
} from "../api/income/incomeAuth";

const IncomeContext = createContext();

export const useIncome = () => {
  const context = useContext(IncomeContext);
  if (!context) {
    throw new Error("useIncome ya esta usado");
  }
  return context;
};

export function IncomeProvider({ children }) {
  const [incomes, setIncome] = useState([]);

  const getIncome = async () => {
    try {
      const res = await getIncomeRequest();
      setIncome(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createIncome = async (Income) => {
    const res = await createIncomeRequest(Income);
    console.log(res);
  };

  const deleteIncome = async (id) => {
    try {
      const res = await deleteIncomeRequest(id);
      if (res.status == 204)
        setIncome(incomes.filter((Income) => Income.id != id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateIncome = async (id, Income) => {
    try {
      await updateIncomeRequest(id, Income);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IncomeContext.Provider
      value={{
        incomes,
        createIncome,
        deleteIncome,
        updateIncome,
        getIncome,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
}
