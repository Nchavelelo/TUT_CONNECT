
import { Notification } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

const NotificationList = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationListProps) => {
  // Group notifications by category
  const categories = ["all", "general", "booking", "maintenance", "academic"] as const;
  
  const getNotificationsByCategory = (category: string) => {
    if (category === "all") return notifications;
    return notifications.filter((notif) => notif.category === category);
  };

  // Get unread count for badges
  const getUnreadCount = (category: string) => {
    const notifs = getNotificationsByCategory(category);
    return notifs.filter((notif) => !notif.read).length;
  };

  // Function to render a notification item
  const renderNotificationItem = (notification: Notification) => (
    <div
      key={notification.id}
      className={`p-4 border-b last:border-0 ${
        notification.read ? "bg-white" : "bg-campus-gray"
      }`}
    >
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-medium text-sm">{notification.title}</h4>
        <span className="text-xs text-gray-500">{notification.date}</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
      <div className="flex justify-between items-center">
        <Badge
          variant="outline"
          className={`capitalize ${
            notification.category === "general"
              ? "border-blue-200 bg-blue-50 text-blue-600"
              : notification.category === "booking"
                ? "border-green-200 bg-green-50 text-green-600"
                : notification.category === "maintenance"
                  ? "border-orange-200 bg-orange-50 text-orange-600"
                  : "border-purple-200 bg-purple-50 text-purple-600"
          }`}
        >
          {notification.category}
        </Badge>
        {!notification.read && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMarkAsRead(notification.id)}
            className="text-xs"
          >
            Mark as read
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold text-campus-primary">Notifications</h3>
        {getUnreadCount("all") > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onMarkAllAsRead}
          >
            Mark all as read
          </Button>
        )}
      </div>

      <Tabs defaultValue="all">
        <div className="px-4 pt-4">
          <TabsList className="w-full grid grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="capitalize relative"
              >
                {category}
                {getUnreadCount(category) > 0 && (
                  <span className="absolute -top-1 -right-1 bg-campus-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {getUnreadCount(category)}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="divide-y max-h-96 overflow-y-auto">
              {getNotificationsByCategory(category).length > 0 ? (
                getNotificationsByCategory(category).map(renderNotificationItem)
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No {category !== "all" ? category : ""} notifications
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default NotificationList;
