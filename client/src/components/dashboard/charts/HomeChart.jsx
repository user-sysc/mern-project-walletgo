import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useExpense } from "../../../context/expenseContext";
import { useIncome } from "../../../context/incomeContext";

const HomeChart = () => {
  const { expenses } = useExpense();
  const { incomes } = useIncome();

  // Transformación de los datos para adaptarlos al nuevo formato
  const data = incomes.map((income, index) => ({
    name: income.name, 
    uv: income.amount, // uv representa ingresos en el nuevo formato
    pv: expenses[index] ? -Math.abs(expenses[index].amount) : 0, // pv representa egresos en el nuevo formato
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
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
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
        <ReferenceLine y={0} stroke="#fff" />
        <Brush dataKey="name" height={30} stroke="#31313c" fill='#12151e' />
        <Bar dataKey="uv" fill="#25B244" name="Ingresos" /> 
        <Bar dataKey="pv" fill="#f44336" name="Egresos" /> 
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HomeChart;