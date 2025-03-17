
import { Navigate, useLocation } from "react-router-dom";
import { employees } from "@/data/employeesData";

interface AdminAuthProps {
  children: React.ReactNode;
}

const AdminAuth = ({ children }: AdminAuthProps) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";
  
  // Get the currently logged in employee for permission checks
  const currentEmployeeEmail = localStorage.getItem("adminEmail");
  const currentEmployee = employees.find(emp => emp.email === currentEmployeeEmail);

  // Check if the current path requires specific permissions
  const checkPermissions = () => {
    // If we don't have an employee, they need to login first
    if (!currentEmployee) return false;
    
    // Default to true for the main dashboard
    if (location.pathname === "/admin") return true;
    
    // Extract the module from the path
    const pathParts = location.pathname.split("/");
    if (pathParts.length < 3) return true;
    
    const module = pathParts[2] as keyof typeof currentEmployee.role.permissions;
    
    // If the module doesn't exist in our permissions, allow access
    if (!currentEmployee.role.permissions[module]) return true;
    
    // Check if the user has read permissions for this module
    return currentEmployee.role.permissions[module]?.read === true;
  };

  if (!isAuthenticated) {
    // Redirect to the sign-in page but save the current location they tried to access
    return <Navigate to="/admin/sign-in" state={{ from: location }} replace />;
  }
  
  // Also check permissions
  if (!checkPermissions()) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default AdminAuth;
