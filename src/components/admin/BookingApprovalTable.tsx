import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bookings as initialBookings, rooms, users } from "@/data/mockData";
import { Booking } from "@/data/types";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Users } from "lucide-react";

const BookingApprovalTable = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const { toast } = useToast();

  // Group bookings by room for easier processing
  const bookingsByRoom = bookings.reduce((acc, booking) => {
    if (!acc[booking.roomId]) {
      acc[booking.roomId] = [];
    }
    acc[booking.roomId].push(booking);
    return acc;
  }, {} as Record<string, Booking[]>);

  // Get pending bookings that need approval
  const pendingBookings = bookings.filter(
    booking => booking.status === 'pendingApproval'
  );

  const getRoom = (roomId: string) => {
    return rooms.find(room => room.id === roomId);
  };

  const getUser = (userId: string) => {
    return users.find(user => user.id === userId);
  };

  // Check if a lecturer has already booked the room for the same time slot
  const hasLecturerBooking = (booking: Booking) => {
    const roomBookings = bookingsByRoom[booking.roomId] || [];
    
    return roomBookings.some(rb => 
      rb.id !== booking.id && 
      rb.date === booking.date &&
      rb.startTime === booking.startTime &&
      rb.endTime === booking.endTime &&
      rb.userRole === 'lecturer' &&
      (rb.status === 'confirmed' || rb.status === 'pendingApproval')
    );
  };

  // Check if room capacity would be exceeded
  const wouldExceedCapacity = (booking: Booking) => {
    const room = getRoom(booking.roomId);
    if (!room) return true;
    
    const roomBookings = bookingsByRoom[booking.roomId] || [];
    
    // Count confirmed bookings for the same time slot
    const confirmedBookingsCount = roomBookings.filter(rb => 
      rb.id !== booking.id && 
      rb.date === booking.date &&
      rb.startTime === booking.startTime &&
      rb.endTime === booking.endTime &&
      rb.status === 'confirmed'
    ).length;
    
    return confirmedBookingsCount >= room.capacity;
  };

  const handleApprove = (bookingId: string) => {
    const bookingToApprove = bookings.find(b => b.id === bookingId);
    
    if (!bookingToApprove) return;
    
    // If it's a lecturer booking, approve it and auto-decline conflicting student bookings
    if (bookingToApprove.userRole === 'lecturer') {
      const updatedBookings = bookings.map(b => {
        if (b.id === bookingId) {
          return { ...b, status: 'confirmed' as const };
        }
        
        // Auto-decline conflicting student bookings
        if (
          b.roomId === bookingToApprove.roomId &&
          b.date === bookingToApprove.date &&
          b.startTime === bookingToApprove.startTime &&
          b.endTime === bookingToApprove.endTime &&
          b.userRole === 'student' &&
          b.status === 'pendingApproval'
        ) {
          return { ...b, status: 'cancelled' as const, notes: 'Auto-declined: Lecturer booking has priority' };
        }
        
        return b;
      });
      
      setBookings(updatedBookings);
      toast({
        title: "Booking Approved",
        description: `Lecturer booking approved and conflicting student bookings automatically declined.`,
      });
    } else {
      // For student bookings, check lecturer bookings and capacity
      const lecturerHasBooked = hasLecturerBooking(bookingToApprove);
      const exceedsCapacity = wouldExceedCapacity(bookingToApprove);
      
      if (lecturerHasBooked) {
        // Auto-decline if a lecturer has booked
        setBookings(bookings.map(b => 
          b.id === bookingId 
            ? { ...b, status: 'cancelled' as const, notes: 'Declined: Conflicting lecturer booking' } 
            : b
        ));
        toast({
          title: "Booking Declined",
          description: "This room is already booked by a lecturer for the requested time slot.",
          variant: "destructive"
        });
      } else if (exceedsCapacity) {
        // Auto-decline if room would be over capacity
        setBookings(bookings.map(b => 
          b.id === bookingId 
            ? { ...b, status: 'cancelled' as const, notes: 'Declined: Room at maximum capacity' } 
            : b
        ));
        toast({
          title: "Booking Declined",
          description: "The room would exceed maximum capacity with this booking.",
          variant: "destructive"
        });
      } else {
        // Approve the booking
        setBookings(bookings.map(b => 
          b.id === bookingId 
            ? { ...b, status: 'confirmed' as const } 
            : b
        ));
        toast({
          title: "Booking Approved",
          description: "Student booking has been approved.",
        });
      }
    }
  };

  const handleDecline = (bookingId: string) => {
    setBookings(bookings.map(b => 
      b.id === bookingId 
        ? { ...b, status: 'cancelled' as const, notes: 'Declined by administrator' } 
        : b
    ));
    toast({
      title: "Booking Declined",
      description: "The booking request has been declined.",
    });
  };

  if (pendingBookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Booking Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>No pending booking requests at this time.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Pending Booking Requests
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingBookings.map(booking => {
              const user = getUser(booking.userId);
              const room = getRoom(booking.roomId);
              const lecturerHasBooked = hasLecturerBooking(booking);
              const exceedsCapacity = wouldExceedCapacity(booking);
              
              return (
                <TableRow key={booking.id} className={
                  lecturerHasBooked && booking.userRole === 'student' ? "bg-red-50" : ""
                }>
                  <TableCell>
                    <div className="font-medium">{user?.name || "Unknown User"}</div>
                    <div className="text-xs text-gray-500">{user?.email || ""}</div>
                  </TableCell>
                  <TableCell>{room?.name || "Unknown Room"}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>
                    {booking.startTime} - {booking.endTime}
                  </TableCell>
                  <TableCell>
                    <Badge className={booking.userRole === 'lecturer' ? "bg-blue-500" : "bg-green-500"}>
                      {booking.userRole}
                    </Badge>
                    {lecturerHasBooked && booking.userRole === 'student' && (
                      <Badge variant="outline" className="ml-2 bg-red-50 text-red-800 border-red-200">
                        Conflict
                      </Badge>
                    )}
                    {exceedsCapacity && booking.userRole === 'student' && (
                      <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-800 border-yellow-200">
                        Capacity
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{booking.purpose}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600"
                        onClick={() => handleApprove(booking.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleDecline(booking.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BookingApprovalTable;