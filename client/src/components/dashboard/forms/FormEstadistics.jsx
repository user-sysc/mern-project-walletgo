import { useAuth } from "../../../context/authContext";
import Example from "../charts/Example";
import "../../../styles/form.css";

function FormExpenses() {
  const { user } = useAuth();

  return (
    <div className="w-full h-full-g">
      {user && (
        <>
          <div className="w-full h-full">
            <div className="header-comp-e">
              <h1 className="title-comp-e">Estadísticas</h1>
            </div>
            <div className="cardg">
              <Example />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FormExpenses;
