
import { Navigate, useLocation } from "react-router-dom";

interface AdminAuthProps {
  children: React.ReactNode;
}

const AdminAuth = ({ children }: AdminAuthProps) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";

  if (!isAuthenticated) {
    // Redirect to the sign-in page but save the current location they tried to access
    return <Navigate to="/admin/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminAuth;
