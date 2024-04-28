import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import Home from "../components/Home.jsx";

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
      </Routes>
    </>
  );
}

export default AppRoutes;
