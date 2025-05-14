import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RoomBookingsTable from "@/components/admin/RoomBookingsTable";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { BookingsByDayChart } from "@/components/admin/BookingsByDayChart";
import { MaintenanceStatusChart } from "@/components/admin/MaintenanceStatusChart";
import { RoomDistributionChart } from "@/components/admin/RoomDistributionChart";
import { MaintenancePriorityChart } from "@/components/admin/MaintenancePriorityChart";

const DashboardAdmin = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:block w-64 border-r bg-white">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-campus-primary">Admin Dashboard</h1>
            <p className="text-gray-600">Monitor and manage campus services and analytics</p>
          </div>

          {/* Analytics Cards */}
          <div className="mb-8">
            <DashboardStats />
          </div>

          {/* Room Bookings Table */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Room Bookings</h2>
            <RoomBookingsTable />
          </div>

          {/* First Chart Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <BookingsByDayChart />
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <MaintenanceStatusChart />
            </div>
          </div>

          {/* Second Chart Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <RoomDistributionChart />
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <MaintenancePriorityChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
