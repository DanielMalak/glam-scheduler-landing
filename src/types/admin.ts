
export type Permission = 
  | "manage:services" 
  | "manage:clients" 
  | "manage:schedule" 
  | "manage:gallery" 
  | "manage:employees"
  | "manage:inquiries"
  | "manage:constants";

export interface EmployeePermissions {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

export interface RolePermissions {
  services: EmployeePermissions;
  clients: EmployeePermissions;
  schedule: EmployeePermissions;
  gallery: EmployeePermissions;
  employees: EmployeePermissions;
  inquiries: EmployeePermissions;
  constants: EmployeePermissions;
}

export interface Role {
  id: string;
  name: string;
  permissions: RolePermissions;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  serviceIds: string[];
  createdAt: Date;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  url: string;
  order: number;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "pending" | "active" | "resolved";
  createdAt: Date;
}

export interface SiteConstants {
  id: string;
  name: string;
  value: string;
  type: "text" | "url" | "phone" | "address" | "coordinates";
}
