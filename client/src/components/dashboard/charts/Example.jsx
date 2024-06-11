import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { useIncome } from "../../../context/incomeContext";
import { useExpense } from "../../../context/expenseContext";

const Example = () => {
  const { incomes } = useIncome();
  const { expenses } = useExpense();

  // Transforma los datos
  const data = incomes.map((income, index) => ({
    subject: income.month, // Asume que cada objeto de ingresos tiene una propiedad 'month'
    A: income.amount, // Asume que cada objeto de ingresos tiene una propiedad 'amount'
    B: expenses[index].amount, // Asume que cada objeto de gastos tiene una propiedad 'amount'
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar
          name="Incomes"
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Radar
          name="Expenses"
          dataKey="B"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default Example;
