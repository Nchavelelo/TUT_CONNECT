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
    <div className="flex h-screen bg-gray-50">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <div className="flex-1 flex flex-col min-h-screen">
            <Navbar />
            <main className="page-container">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-campus-primary">Notifications</h1>
                <p className="text-gray-600">Stay updated with campus announcements and alerts</p>
              </div>
              
              <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
                {canSendNotifications && (
                  <SendNotification />
                )}
                <NotificationList
                  notifications={notifications}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAllAsRead={handleMarkAllAsRead}
                />
              </div>
            </main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Notifications;
