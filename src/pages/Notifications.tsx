import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import NotificationList from "@/components/NotificationList";
import SendNotification from "@/components/SendNotification";
import { notifications as allNotifications } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const Notifications = () => {
  const [notifications, setNotifications] = useState(allNotifications);
  const { toast } = useToast();
  const { user } = useAuth();
  const canSendNotifications = user?.role === "admin" || user?.role === "lecturer";
  
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
                  <h1 className="text-2xl font-bold text-campus-primary">Notifications</h1>
                  <p className="text-gray-600">Stay updated with campus announcements and alerts</p>
                </div>
                
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
                  {canSendNotifications && (
                    <div className="lg:col-span-4">
                      <SendNotification />
                    </div>
                  )}
                  <div className={`${canSendNotifications ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
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

export default Notifications;