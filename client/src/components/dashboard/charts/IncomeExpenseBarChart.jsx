import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { useIncome } from "../../../context/incomeContext";
import { useExpense } from "../../../context/expenseContext";

function IncomeExpenseBarChart() {
  const { incomes } = useIncome();
  const { expenses } = useExpense();

  // Mapear los ingresos y gastos a la estructura de datos requerida por la gráfica
  const data = incomes.map((income, index) => ({
    name: income.title,
    Income: income.amount,
    Expense: expenses[index] ? -expenses[index].amount : 0, // Los gastos se representan como valores negativos
  }));

  return (
    <ResponsiveContainer width="100%" height="400px">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="Income" fill="#8884d8" />
        <Bar dataKey="Expense" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default IncomeExpenseBarChart;
