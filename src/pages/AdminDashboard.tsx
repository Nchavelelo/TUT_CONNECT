
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { BookingsByDayChart } from "@/components/admin/BookingsByDayChart";
import { MaintenanceStatusChart } from "@/components/admin/MaintenanceStatusChart";
import { RoomDistributionChart } from "@/components/admin/RoomDistributionChart";
import { MaintenancePriorityChart } from "@/components/admin/MaintenancePriorityChart";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ResizablePanelGroup direction="horizontal" className="w-full">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={20} className="hidden md:block">
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle className="hidden md:flex" />
        <ResizablePanel defaultSize={80} className="w-full">
          <div className="flex flex-col h-full w-full overflow-hidden">
            <Navbar />
            
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="w-full max-w-full mx-auto space-y-6">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-campus-primary">Analytics Dashboard</h1>
                  <p className="text-gray-600">Overview of campus operations and key metrics</p>
                </div>
                
                <DashboardStats />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <BookingsByDayChart />
                  <MaintenanceStatusChart />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <RoomDistributionChart />
                  <MaintenancePriorityChart />
                </div>
              </div>
            </main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default AdminDashboard;
