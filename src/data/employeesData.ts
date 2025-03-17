
import { Employee, Role } from "../types/admin";
import { services } from "./mockData";

export const roles: Role[] = [
  {
    id: "1",
    name: "Admin",
    permissions: {
      services: { create: true, read: true, update: true, delete: true },
      clients: { create: true, read: true, update: true, delete: true },
      schedule: { create: true, read: true, update: true, delete: true },
      gallery: { create: true, read: true, update: true, delete: true },
      employees: { create: true, read: true, update: true, delete: true }
    }
  },
  {
    id: "2",
    name: "Manager",
    permissions: {
      services: { create: true, read: true, update: true, delete: false },
      clients: { create: true, read: true, update: true, delete: false },
      schedule: { create: true, read: true, update: true, delete: true },
      gallery: { create: true, read: true, update: true, delete: false },
      employees: { create: false, read: true, update: false, delete: false }
    }
  },
  {
    id: "3",
    name: "Stylist",
    permissions: {
      services: { create: false, read: true, update: false, delete: false },
      clients: { create: false, read: true, update: false, delete: false },
      schedule: { create: false, read: true, update: false, delete: false },
      gallery: { create: false, read: true, update: false, delete: false },
      employees: { create: false, read: false, update: false, delete: false }
    }
  }
];

export const employees: Employee[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@dedosglam.com",
    password: "password123",
    role: roles[0],
    serviceIds: services.map(service => service.id),
    createdAt: new Date("2022-01-01")
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@dedosglam.com",
    password: "password123",
    role: roles[1],
    serviceIds: [services[0].id, services[1].id, services[2].id],
    createdAt: new Date("2022-02-15")
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    email: "maria@dedosglam.com",
    password: "password123",
    role: roles[2],
    serviceIds: [services[3].id, services[4].id],
    createdAt: new Date("2022-03-22")
  },
  {
    id: "4",
    name: "Alex Johnson",
    email: "alex@dedosglam.com",
    password: "password123",
    role: roles[2],
    serviceIds: [services[0].id, services[5].id],
    createdAt: new Date("2022-04-10")
  }
];
