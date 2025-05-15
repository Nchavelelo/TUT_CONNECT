
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { MaintenanceAdminView } from "@/components/admin/MaintenanceAdminView";
import { useToast } from "@/components/ui/use-toast";

const MaintenanceAdmin = () => {
  const { toast } = useToast();

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
              <div className="w-full max-w-full mx-auto">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-campus-primary">Maintenance Management</h1>
                  <p className="text-gray-600">Manage and assign maintenance issues across campus</p>
                </div>
                
                <MaintenanceAdminView />
              </div>
            </main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MaintenanceAdmin;
