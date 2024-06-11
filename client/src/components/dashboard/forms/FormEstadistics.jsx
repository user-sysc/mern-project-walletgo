import IncomeExpenseBarChart from "../charts/IncomeExpenseBarChart";
import IncomeExpensePieChart from "../charts/tortaPieChart";
import { useAuth } from "../../../context/authContext";
import "../../../styles/form.css";

function FormExpenses() {
  const { user } = useAuth();

  return (
    <div className="w-full h-full-g">
      {user && (
        <>
          <div className="form-grafica-one">
            <div>
              <IncomeExpenseBarChart />
            </div>
          </div>
          <div className="form-grafica-two">
            <div>
              <IncomeExpensePieChart />
            </div>
            <div>
              <IncomeExpensePieChart />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FormExpenses;
