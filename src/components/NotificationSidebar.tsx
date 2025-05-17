
import React from 'react';
import { X, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { notifications } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NotificationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationSidebar: React.FC<NotificationSidebarProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const unreadNotifications = notifications.filter(notification => !notification.read);

  // Group notifications by date
  const today = new Date().toDateString();
  const todayNotifications = notifications.filter(
    notification => new Date(notification.date).toDateString() === today
  );
  const earlierNotifications = notifications.filter(
    notification => new Date(notification.date).toDateString() !== today
  );

  const handleMarkAsRead = (id: string) => {
    // In a real app, this would update the backend
    toast({
      description: "Notification marked as read",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-lg flex flex-col h-full border-l">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Bell className="h-5 w-5 mr-2 text-campus-primary" />
          <h2 className="text-lg font-semibold">Notifications</h2>
          {unreadNotifications.length > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadNotifications.length} New
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No notifications</div>
        ) : (
          <div className="space-y-4">
            {todayNotifications.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Today</h3>
                <div className="space-y-2">
                  {todayNotifications.map((notification) => (
                    <NotificationItem 
                      key={notification.id} 
                      notification={notification} 
                      onMarkAsRead={handleMarkAsRead} 
                    />
                  ))}
                </div>
              </div>
            )}
            
            {earlierNotifications.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Earlier</h3>
                <div className="space-y-2">
                  {earlierNotifications.map((notification) => (
                    <NotificationItem 
                      key={notification.id} 
                      notification={notification} 
                      onMarkAsRead={handleMarkAsRead} 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>
      
      <div className="p-4 border-t">
        <Button 
          variant="outline"
          className="w-full"
          onClick={() => window.location.href = '/notifications'}
        >
          View All Notifications
        </Button>
      </div>
    </div>
  );
};

interface NotificationItemProps {
  notification: any;
  onMarkAsRead: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead }) => {
  // Map categories to colors
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-amber-100 text-amber-800';
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'booking': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className={`p-3 rounded-lg border ${notification.read ? 'bg-white' : 'bg-blue-50'} hover:bg-gray-50 transition-colors`}
    >
      <div className="flex justify-between mb-1">
        <div className="font-medium text-sm flex items-center">
          {!notification.read && (
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
          )}
          {notification.title}
        </div>
        <span className="text-xs text-gray-500">{notification.date}</span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
      <div className="flex justify-between items-center">
        <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(notification.category)}`}>
          {notification.category}
        </span>
        {!notification.read && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-auto py-1"
            onClick={() => onMarkAsRead(notification.id)}
          >
            Mark as read
          </Button>
        )}
      </div>
    </div>
  );
};

export default NotificationSidebar;
