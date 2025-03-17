
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid grid-cols-[auto,1fr] min-h-screen">
        <AdminSidebar />
        <main className="overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
