import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, BookOpen, Wrench, BarChart } from "lucide-react";
import { rooms, bookings, maintenanceRequests } from "@/data/mockData";

export const DashboardStats = () => {
  const activeBookings = bookings.filter(booking => booking.status === "confirmed").length;
  const openMaintenanceRequests = maintenanceRequests.filter(request => request.status !== "resolved").length;
  
  // Calculate room utilization percentage
  const calculateRoomUtilization = () => {
    const totalCapacity = rooms.reduce((sum, room) => sum + room.capacity, 0);
    const bookedCapacity = bookings
      .filter(booking => booking.status === "confirmed")
      .reduce((sum) => sum + 1, 0); // Each booking counts as 1 student
    
    return totalCapacity > 0 ? Math.round((bookedCapacity / totalCapacity) * 100) : 0;
  };
  
  const utilization = calculateRoomUtilization();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card className="border-l-4 border-l-campus-primary">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-campus-primary" />
              <p className="text-sm font-medium text-gray-500">Total Rooms</p>
            </div>
            <Badge className="bg-campus-primary">{rooms.length}</Badge>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold">{rooms.length}</p>
            <p className="text-sm text-gray-500 mt-1">Available for booking</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-campus-secondary">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-campus-secondary" />
              <p className="text-sm font-medium text-gray-500">Active Bookings</p>
            </div>
            <Badge className="bg-campus-secondary">{activeBookings}</Badge>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold">{activeBookings}</p>
            <p className="text-sm text-gray-500 mt-1">Students booked</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-campus-accent">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Wrench className="h-5 w-5 mr-2 text-campus-accent" />
              <p className="text-sm font-medium text-gray-500">Maintenance Issues</p>
            </div>
            <Badge className="bg-campus-accent">{openMaintenanceRequests}</Badge>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold">{openMaintenanceRequests}</p>
            <p className="text-sm text-gray-500 mt-1">Open requests</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-campus-success">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-campus-success" />
              <p className="text-sm font-medium text-gray-500">Room Utilization</p>
            </div>
            <Badge className="bg-campus-success">{utilization}%</Badge>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold">{utilization}%</p>
            <p className="text-sm text-gray-500 mt-1">Average daily usage</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
