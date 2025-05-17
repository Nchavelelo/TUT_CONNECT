
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Bell, Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import { notifications } from "@/data/mockData";
import NotificationSidebar from "./NotificationSidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const { user } = useAuth();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showNotificationSidebar, setShowNotificationSidebar] = useState(false);
  
  // Get unread notifications count
  const unreadNotifications = notifications.filter(notification => !notification.read).length;

  if (!user) return null;

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-10 w-full">
        <div className="px-4 h-16 flex items-center justify-between w-full">
          {/* Mobile sidebar toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setShowMobileSidebar(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          {/* Title - visible on all screens */}
          <h1 className="text-xl font-bold text-campus-primary md:ml-0 ml-2">
            Smart Campus
          </h1>

          {/* Right side: notifications, etc. */}
          <div className="flex items-center space-x-4">
            {/* Notifications button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => setShowNotificationSidebar(true)}
            >
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-campus-error text-white">
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile sidebar with overlay */}
      {showMobileSidebar && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={() => setShowMobileSidebar(false)}
          />
          <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-campus-primary">
            <div className="absolute top-4 right-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowMobileSidebar(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <Sidebar isMobile onClose={() => setShowMobileSidebar(false)} />
          </div>
        </div>
      )}

      {/* Notification sidebar */}
      <NotificationSidebar 
        isOpen={showNotificationSidebar} 
        onClose={() => setShowNotificationSidebar(false)} 
      />
    </>
  );
};

export default Navbar;
