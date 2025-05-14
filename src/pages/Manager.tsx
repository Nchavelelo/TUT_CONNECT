import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { AdminActions } from "@/components/dashboard/AdminActions";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Navigate } from "react-router-dom";

const Manager = () => {
  const { user, loading } = useAuth();

  // Show loading state while checking auth
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If user is not logged in or not admin, redirect them
  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/admin-dashboard" replace />;
  }

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
                <AdminActions />
              </div>
            </main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Manager;
