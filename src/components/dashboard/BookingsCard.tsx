
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { bookings, rooms } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const BookingsCard = () => {
  const { user } = useAuth();
  const [userBookings, setUserBookings] = useState([]);
  
  useEffect(() => {
    if (user) {
      const filteredBookings = bookings.filter((booking) => booking.userId === user.id);
      setUserBookings(filteredBookings);
    }
  }, [user]);

  if (!user) return null;

  return (
    <Card className="bg-white">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-lg text-campus-primary">Your Bookings</CardTitle>
        <CardDescription>Recently booked rooms & appointments</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {userBookings.length > 0 ? (
          <div className="space-y-3">
            {userBookings.slice(0, 3).map((booking) => {
              const room = rooms.find(r => r.id === booking.roomId);
              
              return (
                <div key={booking.id} className="p-3 border rounded-md border-l-4 border-l-campus-primary">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{room?.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      booking.status === "confirmed" 
                        ? "bg-green-100 text-green-800" 
                        : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm">{booking.date}</p>
                  <p className="text-xs text-gray-600">
                    {booking.startTime} - {booking.endTime}
                  </p>
                </div>
              );
            })}
            
            <Button asChild variant="outline" size="sm" className="w-full mt-2 border-campus-primary text-campus-primary hover:bg-campus-primary hover:text-white">
              <Link to="/room-booking">Manage Bookings</Link>
            </Button>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No recent bookings</p>
            <Button asChild variant="outline" size="sm" className="mt-2 border-campus-primary text-campus-primary hover:bg-campus-primary hover:text-white">
              <Link to="/room-booking">Book a Room</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
