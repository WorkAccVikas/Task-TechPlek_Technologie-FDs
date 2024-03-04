import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  isAuthenticated,
  children,
  adminOnly,
  admin,
  redirect = "/",
}) => {
  console.log("Protected render");
  console.table({ isAuthenticated, admin, adminOnly });

  if (!isAuthenticated) return <Navigate to={redirect} replace={true} />;

  if (adminOnly && !admin) return <Navigate to={redirect} replace={true} />;

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
