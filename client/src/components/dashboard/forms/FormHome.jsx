import { useExpense } from "../../../context/expenseContext";
import { useIncome } from "../../../context/incomeContext";
import { useAuth } from "../../../context/authContext";
import HomeChart from "../charts/HomeChart";
import "../../../styles/form.css";
import Card from "./Card";

const FormHome = () => {
  const { user } = useAuth();
  const { incomes } = useIncome();
  const { expenses } = useExpense();
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const totalIncome = incomes.reduce(
    (total, income) => total + income.amount,
    0
  );
  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const balance = totalIncome - totalExpense;

  return (
    <div className="w-full h-full">
      <div className="header-comp">
        <h1 className="title-comp">
          Bienvenido, {user ? capitalizeFirstLetter(user.name) : ""}
        </h1>
      </div>
      <div className="form card-container">
        <Card color="#12161c" title="Balance" value={`$${balance}`} />
        <Card
          color="#25B244"
          title="Ingresos Totales"
          value={`$${totalIncome}`}
        />
        <Card
          color="#f44336"
          title="Egresos Totales"
          value={`-$${totalExpense}`}
        />
      </div>
      <div className="form-graph-container">
        <div className="graph-padding">
        <HomeChart/>
        </div>
      </div>
    </div>
  );
};

export default FormHome;
