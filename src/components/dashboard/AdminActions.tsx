import { UserCog } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom"; // Make sure to import Link from react-router-dom

export const AdminActions = () => {
  const { user } = useAuth();

  const adminActions = [
    {
      
      title: "Room and Timetble Management",
      description: "Adding a room, upload timetable.",
      icon: UserCog,
      path: "/admin/users", // Path to navigate for User Management
    },
    {
      title: "Reports",
      description: "Generate system usage and visitor reports.",
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24" height="24"
          viewBox="0 0 24 24"
          fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="h-8 w-8 text-campus-primary"
        >
          <path d="M22 2v20M2 10h20M2 18h20M2 2h20" />
        </svg>
      ),
      path: "/admin/admin-dashboard", // Path to navigate for Reports
    },
    {
      title: "System Settings",
      description: "Update platform configurations and security.",
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24" height="24"
          viewBox="0 0 24 24"
          fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="h-8 w-8 text-campus-primary"
        >
          <path d="M12 7V0" />
          <path d="M21.5 12H0" />
          <path d="M12 17v7" />
          <path d="M3 12a9 9 0 0 0 18 0 9 9 0 0 0-18 0Z" />
        </svg>
      ),
      path: "/admin/settings", // Path to navigate for System Settings
    },
    {
      title: "Room Allocations",
      description: "Assign or view room allocations for students.",
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24" height="24"
          viewBox="0 0 24 24"
          fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="h-8 w-8 text-campus-primary"
        >
          <path d="M19 12h-5.5a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H19v2.5a.5.5 0 0 1-.5.5H2" />
          <path d="M2 12h5.5a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2" />
          <path d="M19 7v5" />
          <path d="M2 7v5" />
        </svg>
      ),
      path: "/admin/rooms", // Path to navigate for Room Allocations
    },
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-campus-primary/10 rounded-xl p-6 shadow-sm border">
        <h2 className="text-2xl font-semibold text-campus-primary mb-1">
          Welcome back, {user?.name || "Admin"}!
        </h2>
        <p className="text-sm text-gray-600">
          Here's what you can manage today. Choose an action to get started.
        </p>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Actions</h3>
        <p className="text-sm text-gray-500 mb-4">
          Manage core functionalities and system settings from the dashboard below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {adminActions.map((action) => (
            <Link to={action.path} key={action.title}>
              <div
                className={cn(
                  "rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200",
                  "hover:shadow-lg hover:bg-campus-primary/5 active:scale-[0.98] cursor-pointer"
                )}
              >
                <div className="flex items-center justify-center mb-4">
                  <action.icon />
                </div>
                <h4 className="text-md font-medium text-center text-gray-800">
                  {action.title}
                </h4>
                <p className="text-xs text-center text-gray-500 mt-1">
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
