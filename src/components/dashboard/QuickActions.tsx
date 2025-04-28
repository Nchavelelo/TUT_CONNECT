
import { Link } from "react-router-dom";
import { BookMarked, Clock, BookOpen, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const QuickActions = () => {
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
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {actions.map((action) => (
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
