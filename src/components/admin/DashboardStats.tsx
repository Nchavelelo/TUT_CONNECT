
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { rooms, bookings, maintenanceRequests } from "@/data/mockData";

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Total Rooms</p>
            <Badge className="bg-campus-primary">{rooms.length}</Badge>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-bold">{rooms.length}</p>
            <p className="text-sm text-gray-500 mt-1">Available for booking</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Active Bookings</p>
            <Badge className="bg-campus-secondary">{bookings.length}</Badge>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-bold">{bookings.length}</p>
            <p className="text-sm text-gray-500 mt-1">Across all rooms</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Maintenance Issues</p>
            <Badge className="bg-campus-accent">{maintenanceRequests.length}</Badge>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-bold">{maintenanceRequests.length}</p>
            <p className="text-sm text-gray-500 mt-1">Open requests</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Room Utilization</p>
            <Badge className="bg-campus-success">68%</Badge>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-bold">68%</p>
            <p className="text-sm text-gray-500 mt-1">Average daily usage</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
