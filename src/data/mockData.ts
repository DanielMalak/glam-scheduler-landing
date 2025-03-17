
// Mock data for the admin dashboard
export const servicesData = [
  { id: 1, name: "Haircut", description: "Basic haircut service", price: 50, duration: 45, category: "Hair", popularity: 35 },
  { id: 2, name: "Hair Coloring", description: "Full hair coloring service", price: 120, duration: 120, category: "Hair", popularity: 25 },
  { id: 3, name: "Manicure", description: "Basic manicure service", price: 35, duration: 30, category: "Nails", popularity: 15 },
  { id: 4, name: "Pedicure", description: "Basic pedicure service", price: 45, duration: 45, category: "Nails", popularity: 10 },
  { id: 5, name: "Facial", description: "Basic facial treatment", price: 80, duration: 60, category: "Skin", popularity: 8 },
  { id: 6, name: "Makeup", description: "Full makeup application", price: 90, duration: 60, category: "Makeup", popularity: 7 },
];

export const clientsData = [
  { id: 1, name: "Jane Smith", email: "jane.smith@example.com", phone: "555-123-4567", totalVisits: 8, totalSpent: 560 },
  { id: 2, name: "Emily Johnson", email: "emily.j@example.com", phone: "555-234-5678", totalVisits: 5, totalSpent: 350 },
  { id: 3, name: "Michael Brown", email: "michael.brown@example.com", phone: "555-345-6789", totalVisits: 3, totalSpent: 240 },
  { id: 4, name: "Sarah Wilson", email: "sarah.w@example.com", phone: "555-456-7890", totalVisits: 10, totalSpent: 780 },
  { id: 5, name: "David Lee", email: "david.lee@example.com", phone: "555-567-8901", totalVisits: 2, totalSpent: 130 },
  { id: 6, name: "Jessica Taylor", email: "jessica.t@example.com", phone: "555-678-9012", totalVisits: 6, totalSpent: 420 },
  { id: 7, name: "Robert Martin", email: "robert.m@example.com", phone: "555-789-0123", totalVisits: 4, totalSpent: 320 },
  { id: 8, name: "Amanda Clark", email: "amanda.c@example.com", phone: "555-890-1234", totalVisits: 7, totalSpent: 510 },
];

export const appointmentsData = [
  { id: 1, clientId: 1, clientName: "Jane Smith", serviceId: 1, serviceName: "Haircut", date: "2024-03-17", time: "10:00", status: "confirmed" },
  { id: 2, clientId: 4, clientName: "Sarah Wilson", serviceId: 2, serviceName: "Hair Coloring", date: "2024-03-17", time: "13:00", status: "confirmed" },
  { id: 3, clientId: 2, clientName: "Emily Johnson", serviceId: 3, serviceName: "Manicure", date: "2024-03-18", time: "11:00", status: "confirmed" },
  { id: 4, clientId: 6, clientName: "Jessica Taylor", serviceId: 6, serviceName: "Makeup", date: "2024-03-18", time: "15:30", status: "pending" },
  { id: 5, clientId: 3, clientName: "Michael Brown", serviceId: 5, serviceName: "Facial", date: "2024-03-19", time: "14:00", status: "confirmed" },
  { id: 6, clientId: 8, clientName: "Amanda Clark", serviceId: 4, serviceName: "Pedicure", date: "2024-03-20", time: "10:30", status: "confirmed" },
  { id: 7, clientId: 5, clientName: "David Lee", serviceId: 1, serviceName: "Haircut", date: "2024-03-21", time: "09:00", status: "pending" },
  { id: 8, clientId: 7, clientName: "Robert Martin", serviceId: 2, serviceName: "Hair Coloring", date: "2024-03-22", time: "13:30", status: "confirmed" },
];

export const monthlyClients = [
  { month: "Jan", clients: 15 },
  { month: "Feb", clients: 20 },
  { month: "Mar", clients: 30 },
  { month: "Apr", clients: 27 },
  { month: "May", clients: 32 },
  { month: "Jun", clients: 38 },
];

export const servicePopularity = servicesData.map(service => ({
  name: service.name,
  value: service.popularity
}));

export const getDailyStats = () => {
  const today = new Date().toISOString().split('T')[0];
  const todaySessions = appointmentsData.filter(appointment => appointment.date === "2024-03-17");
  const totalClients = clientsData.length;
  const totalServices = servicesData.length;
  const growthRate = 12.5; // Mock growth rate
  
  return {
    todaySessions,
    totalClients,
    totalServices,
    growthRate
  };
};
