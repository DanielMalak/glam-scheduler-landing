
export type Permission = 
  | "manage:services" 
  | "manage:clients" 
  | "manage:schedule" 
  | "manage:gallery" 
  | "manage:employees";

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
