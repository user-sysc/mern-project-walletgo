import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaMoneyCheck,
  FaThLarge,
  FaChartLine,
  FaCog,
} from "react-icons/fa";
import FormIncomes from "../dashboard/formIncomes.jsx";
import FormExpenses from "./formExpenses.jsx";
import FormCategories from "../dashboard/formCategories.jsx";
import FormEstadistics from "../dashboard/formEstadistics.jsx";
import FormSettings from "../dashboard/formSettings.jsx";
import "../../styles/dashboard.css";

const DashboardBase = () => {
  const [sidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState("");

  return (
    <div className="dashboard">
      {/* BARRA SUPERIOR*/}
      <header className="header">
        <h2 className="nombrelogo">WalletGO</h2>
      </header>

      {/* BARRA DE NAVEGACION LATERAL*/}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link
              className={
                activeContent === "ingresos"
                  ? "nav-link active"
                  : "nav-link collapsed"
              }
              onClick={() => setActiveContent("ingresos")}
            >
              <FaMoneyBillWave
                style={{
                  marginLeft: "0px",
                  marginRight: "5px",
                  fontSize: "20px",
                }}
              />
              <span>Ingresos</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={
                activeContent === "egresos"
                  ? "nav-link active"
                  : "nav-link collapsed"
              }
              onClick={() => setActiveContent("egresos")}
            >
              <FaMoneyCheck
                style={{
                  marginLeft: "0px",
                  marginRight: "5px",
                  fontSize: "20px",
                }}
              />
              <span>Egresos</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={
                activeContent === "categorias"
                  ? "nav-link active"
                  : "nav-link collapsed"
              }
              onClick={() => setActiveContent("categorias")}
            >
              <FaThLarge
                style={{
                  marginLeft: "0px",
                  marginRight: "5px",
                  fontSize: "20px",
                }}
              />
              <span>Categorias</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={
                activeContent === "estadisticas"
                  ? "nav-link active"
                  : "nav-link collapsed"
              }
              onClick={() => setActiveContent("estadisticas")}
            >
              <FaChartLine
                style={{
                  marginLeft: "0px",
                  marginRight: "5px",
                  fontSize: "20px",
                }}
              />
              <span>Estadísticas</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={
                activeContent === "configuracion"
                  ? "nav-link active"
                  : "nav-link collapsed"
              }
              onClick={() => setActiveContent("configuracion")}
            >
              <FaCog
                style={{
                  marginLeft: "0px",
                  marginRight: "5px",
                  fontSize: "20px",
                }}
              />
              <span>Configuración</span>
            </Link>
          </li>
        </ul>
      </aside>

      <main className="main">
        <div className="pagetitle" />
        {activeContent === "ingresos" && <FormIncomes />}
        {activeContent === "egresos" && <FormExpenses />}
        {activeContent === "categorias" && <FormCategories />}
        {activeContent === "estadisticas" && <FormEstadistics />}
        {activeContent === "configuracion" && <FormSettings />}
      </main>
    </div>
  );
};

export default DashboardBase;
