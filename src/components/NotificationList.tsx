
import { Notification } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { formatNotificationDate, getCategoryColor } from "@/lib/utils";
import { 
  Card, 
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle
} from "@/components/ui/card";
import { Bell, Check, CheckCheck } from "lucide-react";

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
  const categories = ["all", "general", "booking", "maintenance", "academic", "urgent"] as const;
  
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
      className={`p-4 border-b last:border-0 transition-all ${
        notification.read ? "bg-white" : "bg-blue-50"
      }`}
    >
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-medium text-sm">{notification.title}</h4>
        <span className="text-xs text-gray-500">{formatNotificationDate(notification.date)}</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
      <div className="flex justify-between items-center">
        <Badge
          variant="outline"
          className={`capitalize ${getCategoryColor(notification.category)}`}
        >
          {notification.category}
        </Badge>
        {!notification.read && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMarkAsRead(notification.id)}
            className="text-xs flex items-center gap-1 hover:bg-blue-100"
          >
            <Check className="h-3 w-3" /> Mark as read
          </Button>
        )}
      </div>
    </div>
  );

  const unreadCount = getUnreadCount("all");

  return (
    <Card className="shadow-md h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between py-4 px-6 border-b">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Bell className="h-5 w-5 text-campus-primary" />
          Notifications
          {unreadCount > 0 && (
            <Badge variant="default" className="ml-2 bg-campus-primary">
              {unreadCount} new
            </Badge>
          )}
        </CardTitle>
        {unreadCount > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onMarkAllAsRead}
            className="flex items-center gap-1"
          >
            <CheckCheck className="h-4 w-4" />
            Mark all read
          </Button>
        )}
      </CardHeader>

      <div className="flex-1 flex flex-col">
        <Tabs defaultValue="all" className="w-full flex-1 overflow-hidden">
          <div className="px-4 pt-4 overflow-x-auto">
            <TabsList className="w-full justify-start overflow-x-auto">
              {categories.map((category) => {
                const count = getUnreadCount(category);
                return (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="capitalize relative"
                  >
                    {category}
                    {count > 0 && (
                      <span className="absolute -top-1 -right-1 bg-campus-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {count}
                      </span>
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="flex-1 overflow-hidden m-0">
              <div className="divide-y max-h-[calc(100vh-16rem)] overflow-y-auto">
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
    </Card>
  );
};

export default NotificationList;
