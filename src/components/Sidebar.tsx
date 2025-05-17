
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BookOpen, 
  Settings, 
  LogOut, 
  Bell, 
  Wrench, 
  Calendar, 
  BarChart,
  PieChart,
  BookUser,
  Clock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const sidebarNavItems = [
  // Student & Lecturer Items
  { 
    name: 'Dashboard', 
    icon: LayoutDashboard, 
    path: '/dashboard',
    roles: ['student', 'lecturer'] 
  },
  { 
    name: 'Room Booking', 
    icon: BookOpen, 
    path: '/room-booking',
    roles: ['student', 'lecturer'] 
  },
  { 
    name: 'Timetable', 
    icon: Calendar, 
    path: '/timetable',
    roles: ['student', 'lecturer'],
    highlight: true,
    description: 'View your weekly schedule'
  },
  { 
    name: 'Appointments', 
    icon: Clock, 
    path: '/appointments',
    roles: ['student', 'lecturer'] 
  },
  { 
    name: 'Maintenance', 
    icon: Wrench, 
    path: '/maintenance',
    roles: ['student', 'lecturer'] 
  },
  { 
    name: 'Notifications', 
    icon: Bell, 
    path: '/notifications',
    roles: ['student', 'lecturer', 'admin'],
    highlight: true,
    description: 'View your notifications'
  },
  
  // Admin Items
  { 
    name: 'Analytics Dashboard', 
    icon: BarChart, 
    path: '/admin',
    roles: ['admin'],
    category: 'Analytics'
  },
  { 
    name: 'Reports', 
    icon: FileText, 
    path: '/reports',
    roles: ['admin'],
    category: 'Analytics' 
  },
  { 
    name: 'User Management', 
    icon: Users, 
    path: '/users',
    roles: ['admin'],
    category: 'Management'
  },
  { 
    name: 'Room Allocations', 
    icon: BookUser, 
    path: '/room-allocations',
    roles: ['admin'],
    category: 'Management'
  },
  { 
    name: 'Timetable Management', 
    icon: Calendar, 
    path: '/timetable',
    roles: ['admin'],
    category: 'Management',
    highlight: true,
    description: 'Manage campus timetables'
  },
  { 
    name: 'Maintenance Management', 
    icon: Wrench, 
    path: '/maintenance-admin',
    roles: ['admin'],
    category: 'Management',
    highlight: true,
    description: 'Manage maintenance requests'
  },
  { 
    name: 'Notifications Management', 
    icon: Bell, 
    path: '/notifications',
    roles: ['admin'],
    category: 'Management',
    highlight: true,
    description: 'Manage system notifications'
  },
  { 
    name: 'System Settings', 
    icon: Settings, 
    path: '/admin-settings',
    roles: ['admin'],
    category: 'System'
  }
];

const Sidebar = ({ isMobile, onClose }: SidebarProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  if (!user) return null;

  const filteredNavItems = sidebarNavItems.filter(item => 
    item.roles.includes(user.role as string)
  );
  
  // Group admin items by category
  const adminCategories = user.role === 'admin' 
    ? [...new Set(filteredNavItems.map(item => item.category).filter(Boolean))]
    : [];

  const handleNavClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };
  
  const handleHighlightedItemClick = (item: any) => {
    handleNavClick();
    if (item.highlight) {
      toast({
        title: item.name,
        description: `Navigating to ${item.description || item.name}`,
      });
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-campus-primary text-white">
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
      
      <nav className="flex-1 overflow-y-auto p-2">
        {user.role === 'admin' ? (
          // Admin sidebar with categories
          <>
            {adminCategories.map((category) => (
              <div key={category} className="mb-4">
                <h3 className="px-2 mb-1 text-xs uppercase tracking-wider text-white/50">{category}</h3>
                {filteredNavItems
                  .filter(item => item.category === category)
                  .map((item) => (
                    <Link 
                      key={item.path} 
                      to={item.path}
                      className={cn(
                        "flex items-center p-2 rounded-lg mb-1 transition-all duration-200 hover:bg-white/10",
                        location.pathname === item.path && "bg-white text-campus-primary font-medium",
                        item.highlight && "border-l-2 border-campus-secondary"
                      )}
                      onClick={() => handleHighlightedItemClick(item)}
                    >
                      <item.icon className="mr-2" size={18} />
                      <div>
                        <span className="text-sm">{item.name}</span>
                        {item.description && item.highlight && (
                          <p className="text-xs opacity-75">{item.description}</p>
                        )}
                      </div>
                    </Link>
                  ))}
              </div>
            ))}
          </>
        ) : (
          // Student/Lecturer sidebar (no categories)
          <>
            {filteredNavItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={cn(
                  "flex items-center p-2 rounded-lg mb-1 transition-all duration-200 hover:bg-white/10",
                  location.pathname === item.path && "bg-white text-campus-primary font-medium",
                  item.highlight && "border-l-2 border-campus-secondary"
                )}
                onClick={() => handleHighlightedItemClick(item)}
              >
                <item.icon className="mr-2" size={18} />
                <div>
                  <span className="text-sm">{item.name}</span>
                  {item.description && item.highlight && (
                    <p className="text-xs opacity-75">{item.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </>
        )}
      </nav>
      
      <div className="p-4 border-t border-white/10 mt-auto">
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
