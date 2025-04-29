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
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
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