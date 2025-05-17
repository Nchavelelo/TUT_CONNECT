
import { Link } from "react-router-dom";
import { BookMarked, Clock, BookOpen, AlertTriangle, Calendar, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

export const QuickActions = () => {
  const { user } = useAuth();
  
  const actions = [
    {
      title: "Room Bookings",
      icon: BookMarked,
      path: "/room-booking",
    },
    {
      title: "Timetable",
      icon: Clock,
      path: "/timetable",
    },
    {
      title: "Appointments",
      icon: Calendar,
      path: "/appointments",
      roles: ["student", "lecturer"],
    },
    {
      title: "Maintenance",
      icon: AlertTriangle,
      path: "/maintenance",
    },
    {
      title: "Notices",
      icon: BookOpen,
      path: "/notifications",
      badge: true,
    },
    {
      title: "Database Schema",
      icon: Database,
      path: "/erd",
      roles: ["admin"],
    },
  ];

  const filteredActions = actions.filter(action => 
    !action.roles || (user && action.roles.includes(user.role as string))
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {filteredActions.map((action) => (
        <Link
          key={action.path}
          to={action.path}
          className="transform transition-all duration-200 hover:scale-105"
        >
          <Card className="bg-white hover:shadow-lg border-2 border-campus-primary hover:border-campus-secondary">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <action.icon className="h-8 w-8 text-campus-primary mb-3" />
              <h3 className="font-medium text-center text-gray-800">{action.title}</h3>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
