
import { Role } from "@/types/admin";

export const rolesData: Role[] = [
  {
    id: "1",
    name: "Administrator",
    permissions: {
      services: { create: true, read: true, update: true, delete: true },
      clients: { create: true, read: true, update: true, delete: true },
      schedule: { create: true, read: true, update: true, delete: true },
      gallery: { create: true, read: true, update: true, delete: true },
      employees: { create: true, read: true, update: true, delete: true },
      inquiries: { create: true, read: true, update: true, delete: true },
      constants: { create: true, read: true, update: true, delete: true }
    }
  },
  {
    id: "2",
    name: "Manager",
    permissions: {
      services: { create: true, read: true, update: true, delete: false },
      clients: { create: true, read: true, update: true, delete: false },
      schedule: { create: true, read: true, update: true, delete: false },
      gallery: { create: true, read: true, update: true, delete: false },
      employees: { create: false, read: true, update: false, delete: false },
      inquiries: { create: true, read: true, update: true, delete: false },
      constants: { create: false, read: true, update: true, delete: false }
    }
  },
  {
    id: "3",
    name: "Stylist",
    permissions: {
      services: { create: false, read: true, update: false, delete: false },
      clients: { create: false, read: true, update: false, delete: false },
      schedule: { create: true, read: true, update: true, delete: false },
      gallery: { create: false, read: true, update: false, delete: false },
      employees: { create: false, read: false, update: false, delete: false },
      inquiries: { create: false, read: true, update: true, delete: false },
      constants: { create: false, read: true, update: false, delete: false }
    }
  },
  {
    id: "4",
    name: "Receptionist",
    permissions: {
      services: { create: false, read: true, update: false, delete: false },
      clients: { create: true, read: true, update: true, delete: false },
      schedule: { create: true, read: true, update: true, delete: false },
      gallery: { create: false, read: true, update: false, delete: false },
      employees: { create: false, read: false, update: false, delete: false },
      inquiries: { create: true, read: true, update: true, delete: false },
      constants: { create: false, read: true, update: false, delete: false }
    }
  }
];
