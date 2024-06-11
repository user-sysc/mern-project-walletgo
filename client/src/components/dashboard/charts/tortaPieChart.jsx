import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { useIncome } from "../../../context/incomeContext";
import { useExpense } from "../../../context/expenseContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function IncomeExpensePieChart() {
  const { incomes } = useIncome();
  const { expenses } = useExpense();

  // Mapear los ingresos y gastos a la estructura de datos requerida por la gráfica
  const data = [
    {
      name: "Income",
      value: incomes.reduce((total, income) => total + income.amount, 0),
    },
    {
      name: "Expense",
      value: expenses.reduce((total, expense) => total + expense.amount, 0),
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={165}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default IncomeExpensePieChart;
