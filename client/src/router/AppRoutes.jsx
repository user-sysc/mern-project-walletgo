import DashboardBase from "../components/dashboard/DashboardBase";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomeBase from "../components/landingPage/HomeBase.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";

import { CategoryProvider } from "../context/categoryContext";
import { ExpenseProvider } from "../context/expenseContext";
import { IncomeProvider } from "../context/incomeContext";
import { AuthProvider } from "../context/authContext";

function AppRoutes() {
  return (
    <>
      <AuthProvider>
        <CategoryProvider>
          <IncomeProvider>
            <ExpenseProvider>
              <BrowserRouter>
                <Routes>
                  {/* Ruta para el HOME */}
                  <Route path="/" element={<HomeBase />} />
                  {/* <Route path="/" element={<DashboardBase />} /> */}
                  {/* Ruta para la página de Login */}
                  <Route path="/Login" element={<LoginPage />} />
                  {/* Ruta para la página de Signup */}
                  <Route path="/Signup" element={<SignupPage />} />
                  {/* Ruta para páginas no encontradas */}
                  <Route path="/*" element={<NotFoundPage />} />
                  {/* Ruta para la página de Dashboard */}
                  <Route element={<ProtectedRoutes />}>
                    <Route path="/Dashboard" element={<DashboardBase />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </ExpenseProvider>
          </IncomeProvider>
        </CategoryProvider>
      </AuthProvider>
    </>
  );
}

export default AppRoutes;
