import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaMoneyCheck,
  FaThLarge,
  FaChartLine,
  FaCog,
  FaHome,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

import FormHome from "./forms/FormHome.jsx";
import FormIncomes from "./forms/FormIncomes.jsx";
import FormExpenses from "./forms/FormExpenses.jsx";
import FormCategories from "./forms/FormCategories.jsx";
import FormEstadistics from "./forms/FormEstadistics.jsx";
import FormSettings from "./forms/FormSettings.jsx";

import "../../styles/dashboard.css";
import { useAuth } from "../../context/authContext";

const DashboardBase = () => {
  const [sidebarOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  const [activeContent, setActiveContent] = useState("");

  return (
    <div className="dashboard">
      {/* BAR-TOP*/}
      <header className="header">
        <h2 className="nombrelogo" style={{ marginLeft: "5px" }}>
          Wallet<span style={{ color: "#1DB13E" }}>GO</span>
        </h2>
        <FaUserCircle
          style={{ marginRight: "8px", fontSize: "24px" }}
          title={isAuthenticated ? user.name : "Nombre usuario"}
        />
      </header>

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul className="sidebar-nav-top" id="sidebar-nav">
          <li className="nav-item">
            <Link
              className={
                activeContent === "home"
                  ? "nav-link active"
                  : "nav-link collapsed"
              }
              onClick={() => setActiveContent("home")}
            >
              <FaHome className="iconsFa" />
              <span>Home</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={
                activeContent === "ingresos"
                  ? "nav-link active"
                  : "nav-link collapsed"
              }
              onClick={() => setActiveContent("ingresos")}
            >
              <FaMoneyBillWave className="iconsFa" />
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
              <FaMoneyCheck className="iconsFa" />
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
              <FaThLarge className="iconsFa" />
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
              <FaChartLine className="iconsFa" />
              <span>Estadísticas</span>
            </Link>
          </li>
        </ul>
        <ul className="sidebar-nav-bottom">
          <li className="nav-item">
            <Link
              className={
                activeContent === "configuracion"
                  ? "nav-link active"
                  : "nav-link collapsed"
              }
              onClick={() => setActiveContent("configuracion")}
            >
              <FaCog className="iconsFa" />
              <span>Configuración</span>
            </Link>
            <li className="nav-item">
              {isAuthenticated ? (
                <Link
                  className={
                    activeContent === "logout"
                      ? "nav-link active"
                      : "nav-link collapsed"
                  }
                  onClick={() => {
                    logout();
                  }}
                >
                  <FaSignOutAlt className="iconsFa" />
                  <span>Logout</span>
                </Link>
              ) : (
                <></>
              )}
            </li>
          </li>
        </ul>
      </aside>

      <main className="main">
        <div className="pagetitle" />
        {activeContent === "home" && <FormHome />}
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
