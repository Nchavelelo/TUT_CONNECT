import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import NotificationList from "@/components/NotificationList";
import { notifications as allNotifications } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import ManageNotification from "@/components/ManageNotification";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState(allNotifications);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Ensure only admins can access this page
  if (user?.role !== "admin") {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>You do not have access to view this page</p>
      </div>
    );
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );

    toast({
      description: "Notification marked as read",
    });
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );

    toast({
      description: "All notifications marked as read",
    });
  };

  const handleManageNotification = (id: string, action: string) => {
    // Implement logic for managing notifications, such as approval or rejection
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, status: action } : notification
      )
    );

    toast({
      description: `Notification ${action}`,
    });
  };

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
                  <h1 className="text-2xl font-bold text-campus-primary">Admin Notifications</h1>
                  <p className="text-gray-600">Manage notifications and updates for the campus</p>
                </div>

                <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <ManageNotification
                      notifications={notifications}
                      onMarkAllAsRead={handleMarkAllAsRead}
                      onManageNotification={handleManageNotification} // Manage notifications (approve/reject)
                    />
                  </div>
                  <div className="lg:col-span-8">
                    <NotificationList
                      notifications={notifications}
                      onMarkAsRead={handleMarkAsRead}
                      onMarkAllAsRead={handleMarkAllAsRead} 
                    />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default AdminNotifications;
