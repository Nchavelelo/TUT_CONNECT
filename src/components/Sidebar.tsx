import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, BookUser, Settings, LogOut, Bell, Wrench, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const sidebarNavItems = [
  { 
    name: 'Dashboard', 
    icon: Home, 
    path: '/dashboard',
    roles: ['student', 'lecturer', 'admin'] 
  },
  { 
    name: 'Room Booking', 
    icon: BookOpen, 
    path: '/room-booking',
    roles: ['student', 'lecturer'] 
  },
  { 
    name: 'Timetable', 
    icon: BookUser, 
    path: '/timetable',
    roles: ['student', 'lecturer'] 
  },
  { 
    name: 'Appointments', 
    icon: Calendar, 
    path: '/appointments',
    roles: ['student', 'lecturer'] 
  },
  { 
    name: 'Maintenance', 
    icon: Wrench, 
    path: '/maintenance',
    roles: ['student', 'lecturer', 'admin'] 
  },
  { 
    name: 'Notifications', 
    icon: Bell, 
    path: '/notifications',
    roles: ['student', 'lecturer', 'admin'] 
  },
  { 
    name: 'Admin', 
    icon: Settings, 
    path: '/admin',
    roles: ['admin'] 
  }
];

const Sidebar = ({ isMobile, onClose }: SidebarProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const filteredNavItems = sidebarNavItems.filter(item => 
    item.roles.includes(user.role as string)
  );

  const handleNavClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <div className="h-full w-full bg-campus-primary text-white flex flex-col">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-campus-secondary text-black">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="overflow-hidden">
            <h2 className="text-sm font-semibold truncate">{user.name}</h2>
            <p className="text-xs capitalize opacity-75 truncate">{user.role}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-2 overflow-y-auto">
        {filteredNavItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className={cn(
              "flex items-center p-2 rounded-lg mb-1 transition-all duration-200 hover:bg-white/10",
              location.pathname === item.path && "bg-white text-campus-primary font-medium"
            )}
            onClick={handleNavClick}
          >
            <item.icon className="mr-2" size={18} />
            <span className="text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-white/10">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-white hover:bg-white/10"
          onClick={logout}
        >
          <LogOut className="mr-2" size={18} />
          <span className="text-sm">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;