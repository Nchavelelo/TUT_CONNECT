
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { classes, rooms } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ClassesCard = () => {
  const { user } = useAuth();
  if (!user) return null;

  const upcomingClasses = user.role === "student" 
    ? classes
    : user.role === "lecturer" 
      ? classes.filter(c => c.instructor.includes("Dr.") || c.instructor.includes("Prof."))
      : [];

  return (
    <Card className="md:col-span-2 bg-white">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-lg text-campus-primary">
          {user.role === "lecturer" ? "Your Classes Today" : "Your Classes Today"}
        </CardTitle>
        <CardDescription>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {upcomingClasses.length > 0 ? (
          <div className="space-y-3">
            {upcomingClasses.slice(0, 3).map((cls) => {
              const room = rooms.find(r => r.id === cls.roomId);
              
              return (
                <div key={cls.id} className="flex items-center p-3 bg-gray-50 rounded-md border-l-4 border-campus-primary">
                  <div className="flex-shrink-0 w-16 h-16 bg-campus-primary text-white rounded flex flex-col items-center justify-center mr-4">
                    <span className="text-xs">{cls.day}</span>
                    <span className="text-xl font-bold">{cls.startTime}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{cls.name}</h4>
                    <p className="text-sm text-gray-600">{cls.code} • {room?.name}</p>
                    <p className="text-xs text-gray-500">{cls.instructor}</p>
                  </div>
                </div>
              );
            })}
            
            <Button asChild variant="outline" size="sm" className="w-full mt-2 border-campus-primary text-campus-primary hover:bg-campus-primary hover:text-white">
              <Link to="/timetable">View Full Timetable</Link>
            </Button>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No classes scheduled for today</p>
            <Button asChild variant="outline" size="sm" className="mt-2 border-campus-primary text-campus-primary hover:bg-campus-primary hover:text-white">
              <Link to="/timetable">View Full Timetable</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
