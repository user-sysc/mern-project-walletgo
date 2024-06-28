import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { useExpense } from "../../../context/expenseContext";

function ExpensePieChart() {
  const { expenses } = useExpense();

  const data01 = expenses.map((expense) => ({
    name: expense.title,
    value: expense.amount,
  }));

  const data02 = expenses.map((expense) => ({
    name: expense.title,
    value: expense.amount,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data01}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={115}
          fill="#8884d8"
        />
        <Pie
          data={data02}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={130}
          outerRadius={160}
          fill="#3cc75b"
          label
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default ExpensePieChart;
