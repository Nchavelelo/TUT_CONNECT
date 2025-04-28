
import { useAuth } from "@/hooks/useAuth";
import { maintenanceRequests } from "@/data/mockData";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const MaintenanceRequestsCard = () => {
  const { user } = useAuth();
  if (!user) return null;

  const userMaintenanceRequests = maintenanceRequests.filter(
    (request) => request.reporterId === user.id
  );

  if (userMaintenanceRequests.length === 0) return null;

  return (
    <Card className="mt-6 bg-white">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-lg text-campus-primary">Maintenance Requests</CardTitle>
        <CardDescription>Status of your reported issues</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {userMaintenanceRequests.slice(0, 2).map((request) => (
            <div key={request.id} className="p-3 border rounded-md border-l-4 border-l-campus-primary">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{request.title}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  request.status === "resolved" 
                    ? "bg-green-100 text-green-800" 
                    : request.status === "in-progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                }`}>
                  {request.status}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">{request.location}</p>
              <p className="text-sm mt-1">{request.description}</p>
            </div>
          ))}
          
          <Button asChild variant="outline" size="sm" className="w-full mt-2 border-campus-primary text-campus-primary hover:bg-campus-primary hover:text-white">
            <Link to="/maintenance">View All Requests</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
