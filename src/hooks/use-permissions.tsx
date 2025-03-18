
import { useEffect, useState } from "react";
import { employees } from "@/data/employeesData";
import { EmployeePermissions } from "@/types/admin";

export type ModuleType = "services" | "clients" | "schedule" | "gallery" | "employees" | "inquiries" | "constants";

export function usePermissions(module: ModuleType) {
  const [permissions, setPermissions] = useState<EmployeePermissions>({
    create: false,
    read: false,
    update: false,
    delete: false
  });

  useEffect(() => {
    const currentEmployeeEmail = localStorage.getItem("adminEmail");
    const currentEmployee = employees.find(emp => emp.email === currentEmployeeEmail);

    if (currentEmployee) {
      setPermissions(currentEmployee.role.permissions[module]);
    }
  }, [module]);

  return permissions;
}
