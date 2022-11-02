import { Outlet, Navigate } from "react-router-dom";
const PrivateRoutes = () => {
  let isLogged = JSON.parse(localStorage.getItem("user"));

  return isLogged !== null ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
