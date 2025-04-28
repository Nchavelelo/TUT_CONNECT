
import { useAuth } from "@/hooks/useAuth";

export const DashboardHeader = () => {
  const { user } = useAuth();
  if (!user) return null;

  const userDetails = localStorage.getItem("tutConnectUserDetails");
  const parsedUserDetails = userDetails ? JSON.parse(userDetails) : null;
  const campus = parsedUserDetails?.campus ? parsedUserDetails.campus.charAt(0).toUpperCase() + parsedUserDetails.campus.slice(1) : "Pretoria";
  const faculty = parsedUserDetails?.faculty ? parsedUserDetails.faculty : "Information & Communication Technology";

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-campus-primary">
          Welcome to TUT Connect, {user?.name}
        </h1>
        <p className="text-gray-600">
          {user?.role === "student" 
            ? `${campus} Campus | ${faculty}` 
            : user?.role === "lecturer" 
              ? `${campus} Campus | Lecturer` 
              : "System Administrator"}
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">Today's Date</p>
        <p className="font-medium">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
    </div>
  );
};
