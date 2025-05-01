
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RoomBookingsTable from "@/components/admin/RoomBookingsTable";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { BookingsByDayChart } from "@/components/admin/BookingsByDayChart";
import { MaintenanceStatusChart } from "@/components/admin/MaintenanceStatusChart";
import { RoomDistributionChart } from "@/components/admin/RoomDistributionChart";
import { MaintenancePriorityChart } from "@/components/admin/MaintenancePriorityChart";


const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      <div className="flex-1">
        <Navbar />
        
        <main className="page-container">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-campus-primary">Admin Dashboard</h1>
            <p className="text-gray-600">Monitor and manage campus services</p>
          </div>
          
          <DashboardStats />
          
          <div className="mb-8">
            <RoomBookingsTable />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <BookingsByDayChart />
            <MaintenanceStatusChart />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RoomDistributionChart />
            <MaintenancePriorityChart />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
