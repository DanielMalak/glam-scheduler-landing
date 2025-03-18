
import { Inquiry } from "@/types/admin";

export const inquiriesData: Inquiry[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "555-123-4567",
    message: "I would like to know more about your hair coloring services and the products you use.",
    status: "pending",
    createdAt: new Date(2024, 2, 10)
  },
  {
    id: "2",
    name: "Emily Johnson",
    email: "emily.j@example.com",
    phone: "555-234-5678",
    message: "Do you offer bridal makeup services? I'm getting married in June and looking for a makeup artist.",
    status: "active",
    createdAt: new Date(2024, 2, 12)
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "555-345-6789",
    message: "I'd like to book a group appointment for me and 3 friends for manicures. Do you offer group discounts?",
    status: "resolved",
    createdAt: new Date(2024, 2, 15)
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.w@example.com",
    phone: "555-456-7890",
    message: "What are your salon hours on weekends? Can I schedule an appointment for this Sunday?",
    status: "pending",
    createdAt: new Date(2024, 2, 18)
  },
  {
    id: "5",
    name: "Robert Davis",
    email: "robert.d@example.com",
    phone: "555-567-8901",
    message: "I have some questions about your skincare treatments. Do you offer consultations?",
    status: "active",
    createdAt: new Date(2024, 2, 20)
  }
];
