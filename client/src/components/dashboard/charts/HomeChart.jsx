import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { useExpense } from "../../../context/expenseContext";
import { useIncome } from "../../../context/incomeContext"

const HomeChart = () => {
  const { expenses } = useExpense();
  const { incomes } = useIncome();

  const data = incomes.map((income, index) => ({
    name: income.name, 
    ingresos: income.amount,
    egresos: expenses[index] ? -Math.abs(expenses[index].amount) : 0, 
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
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
        <Bar dataKey="ingresos" fill="#25B244" name="Ingresos" />
        <Bar dataKey="egresos" fill="#f44336" name="Egresos" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HomeChart;