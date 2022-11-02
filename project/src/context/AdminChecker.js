import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
  let isAdmin = window.localStorage.getItem("admin");
  return isAdmin === "true" ? <Outlet /> : <Navigate to="/home" />;
};
export default AdminRoute;
