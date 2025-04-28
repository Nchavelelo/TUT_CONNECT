
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { AdminActions } from "@/components/dashboard/AdminActions";
import { ClassesCard } from "@/components/dashboard/ClassesCard";
import { BookingsCard } from "@/components/dashboard/BookingsCard";
import { MaintenanceRequestsCard } from "@/components/dashboard/MaintenanceRequestsCard";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const Dashboard = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-50">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <div className="flex-1 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 p-8 overflow-auto">
              <div className="max-w-7xl mx-auto space-y-8">
                <DashboardHeader />
                <QuickActions />
                {user?.role === "admin" && <AdminActions />}
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ClassesCard />
                  <BookingsCard />
                  <MaintenanceRequestsCard />
                </div>
              </div>
            </main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Dashboard;
