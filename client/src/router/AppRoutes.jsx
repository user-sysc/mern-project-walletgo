import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import Contact from "../components/landingPage/Contact.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import NavBar from "../components/landingPage/NavBar.jsx";
import Footer from "../components/landingPage/Footer.jsx";
import Home from "../components/landingPage/Home.jsx";
import DashboardBase from "../components/dashboard/DashboardBase";

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* Ruta para el HOME */}
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Home />
              <Contact />
              <Footer />
            </>
          }
        />
        {/* Ruta para la página de Login */}
        <Route path="/Login" element={<LoginPage />} />
        {/* Ruta para la página de Signup */}
        <Route path="/Signup" element={<SignupPage />} />
        {/* Ruta para páginas no encontradas */}
        <Route path="/*" element={<NotFoundPage />} />
        {/* Ruta para la página de Dashboard */}
        <Route path="/Dashboard" element={<DashboardBase />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
