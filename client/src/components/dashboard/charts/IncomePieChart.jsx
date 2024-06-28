import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { useIncome } from "../../../context/incomeContext";

function IncomePieChart() {
  const { incomes } = useIncome();

  const data01 = incomes.map((income) => ({
    name: income.title,
    value: income.amount,
  }));

  const data02 = incomes.map((income) => ({
    name: income.title,
    value: income.amount,
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
          label="#fff"
          
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default IncomePieChart;
