import { useAuth } from "../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const { loading, isAuthenticated } = useAuth();
  console.log(loading, isAuthenticated);

  if (loading) return <h1>Loanding ....</h1>;
  if (!loading && !isAuthenticated) return <Navigate to="/Login" replace />;
  return <Outlet />;
}

export default ProtectedRoutes;
